const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// Middleware
app.use(cors());
app.use(express.json()); // Access to request.body

// Login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await pool.query(
      "SELECT * FROM users WHERE email = $1 AND hashed_password = $2",
      [email, password]
    );

    if (user.rows.length === 0) {
      return res.status(401).json("Invalid email or password");
    }

    res.json("Login successful");
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server error");
  }
});

// Sign up
app.post("/signup", async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json("User already exists");
    }

    await pool.query(
      "INSERT INTO users (email, hashed_password, first_name, last_name) VALUES ($1, $2, $3, $4)",
      [email, password, firstName, lastName]
    );

    res.json("Sign up successful");
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server error");
  }
});

// Get up-to-date court information
app.get("/getcourts", async (req, res) => {
  try {
    // Query the database to retrieve courts
    const { rows: courts } = await pool.query("SELECT * FROM courts");
    const { rows: bookings } = await pool.query("SELECT * FROM bookings");

    // Send the retrieved courts as the response
    res.json(estimateCourtStatus(courts, bookings));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Helper function for calculating the current court statuses
function estimateCourtStatus(courts, bookings) {
  const currentTime = new Date();
  const MINUTESPERPLAY = 60;

  for (const court of courts) {
    const courtBookings = bookings.filter(
      (booking) => booking.court_id === court.id
    );

    courtBookings.sort(
      (a, b) => new Date(b.booking_datetime) - new Date(a.booking_datetime)
    );

    let isAvailable = true;
    let estimatedTimeRemaining = 0;

    for (const booking of courtBookings) {
      const playStartTime = new Date(booking.play_start_time);
      const playEndTime = new Date(booking.play_end_time);

      if (currentTime <= playEndTime) {
        isAvailable = false;
        estimatedTimeRemaining = Math.ceil(
          (playEndTime - currentTime) / 1000 / MINUTESPERPLAY
        );
        break;
      }
    }

    court.status = isAvailable ? "available" : "waitlist";
    court.estimatedTimeRemaining = estimatedTimeRemaining;
    court.numPartiesWaiting = Math.ceil(
      estimatedTimeRemaining / MINUTESPERPLAY
    );
  }

  return courts;
}

app.get("/getusers", async (req, res) => {
  try {
    // Query the database to retrieve users
    const query = "SELECT * FROM users";
    const { rows: users } = await pool.query(query);

    // Send the retrieved courts as the response
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/getbookings", async (req, res) => {
  try {
    // Query the database to retrieve courts
    const query = "SELECT * FROM bookings";
    const { rows: bookings } = await pool.query(query);

    // Send the retrieved courts as the response
    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Endpoint for adding a new booking
app.post("/addbooking", async (req, res) => {
  try {
    const { rows: courts } = await pool.query("SELECT * FROM courts");
    const { rows: bookings } = await pool.query("SELECT * FROM bookings");

    const { user_email, court_id } = req.body;

    // const { user_email, court_id, booking_datetime, booking_type } = req.body;

    // Insert the new booking into the bookings table
    const insertQuery =
      "INSERT INTO bookings (user_email, court_id, booking_datetime, booking_type) VALUES ($1, $2, $3, $4) RETURNING *";
    const values = [user_email, court_id, booking_datetime, booking_type];
    const result = await pool.query(insertQuery, values);

    // Send a success response with the inserted booking data
    res.status(200).json({
      message: "Booking added successfully",
      booking: result.rows[0],
    });
  } catch (error) {
    console.error("Error adding booking:", error);
    res.status(500).json({
      message: "An error occurred while adding the booking",
    });
  }
});

function addBooking(courts, bookings, id, user_email) {
  const currentTime = new Date();
  const MINUTESPERPLAY = 60;

  for (const court of courts) {
    const courtBookings = bookings.filter(
      (booking) => booking.court_id === court.id
    );

    courtBookings.sort(
      (a, b) => new Date(b.booking_datetime) - new Date(a.booking_datetime)
    );

    let isAvailable = true;
    let estimatedTimeRemaining = 0;

    for (const booking of courtBookings) {
      const playStartTime = new Date(booking.play_start_time);
      const playEndTime = new Date(booking.play_end_time);

      if (currentTime <= playEndTime) {
        isAvailable = false;
        estimatedTimeRemaining = Math.ceil(
          (playEndTime - currentTime) / 1000 / MINUTESPERPLAY
        );
        break;
      }
    }

    court.status = isAvailable ? "available" : "waitlist";
    court.estimatedTimeRemaining = estimatedTimeRemaining;
    court.numPartiesWaiting = Math.ceil(
      estimatedTimeRemaining / MINUTESPERPLAY
    );
  }
}

// ...
// Other routes for check-in, join waitlist, etc.

app.listen(5000, () => {
  console.log("Server has started on port 5000");
});
