const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

const jwt = require("jsonwebtoken");

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
    const token = jwt.sign({ email }, "jwtSecret", {
      expiresIn: 300,
    });
    res.json({ auth: true, token: token, user: email });
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server error");
  }
});

const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(401).json({
      auth: false,
      message: "Authentication failed, token is required",
    });
  } else {
    jwt.verify(token, "jwtSecret", (err, decoded) => {
      if (err) {
        return res
          .status(403)
          .json({ auth: false, message: "Failed to authenticate token" });
      } else {
        // Token is valid, store the user ID in the request for later use
        req.userId = decoded.id;
        next();
      }
    });
  }
};

app.get("/isUserAuth", verifyJWT, (req, res) => {
  res.send("User is authenticated");
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
  // Create a sample date (for example, "July 31, 2023 12:34:56")
  const currentTime = new Date();
  const MINUTESPERPLAY = 60;
  const userTimezoneOffset = currentTime.getTimezoneOffset(); // Get local timezone offset in minutes

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
      const playEndTime =
        new Date(booking.play_end_time) - userTimezoneOffset * 60000;

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

app.post("/getlatestbooking", async (req, res) => {
  try {
    const { user_email } = req.body;

    // Query the database to retrieve the latest booking for the given user
    const query =
      "SELECT * FROM bookings WHERE user_email = $1 ORDER BY booking_datetime DESC LIMIT 1";
    const { rows: bookings } = await pool.query(query, [user_email]);

    if (bookings.length === 0) {
      res.json(0);
      return;
      // return res
      //   .status(404)
      //   .json({ message: "No bookings found for the user" });
    }

    // Send the retrieved booking as the response

    const latestBooking = bookings[0];

    // Convert UTC timestamps to the client's local time zone
    const clientTimezoneOffset = new Date().getTimezoneOffset() * 60000;
    latestBooking.booking_datetime = new Date(
      new Date(latestBooking.booking_datetime) - clientTimezoneOffset
    );
    latestBooking.play_start_time = new Date(
      new Date(latestBooking.play_start_time) - clientTimezoneOffset
    );
    latestBooking.play_end_time = new Date(
      new Date(latestBooking.play_end_time) - clientTimezoneOffset
    );

    res.json(latestBooking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

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

app.delete("/deletebooking", async (req, res) => {
  try {
    const { booking_id } = req.body;

    // Check if the booking exists
    const checkBookingQuery = "SELECT * FROM bookings WHERE booking_id = $1";
    const checkBookingResult = await pool.query(checkBookingQuery, [
      booking_id,
    ]);

    if (checkBookingResult.rows.length === 0) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Delete the booking
    const deleteBookingQuery = "DELETE FROM bookings WHERE booking_id = $1";
    await pool.query(deleteBookingQuery, [booking_id]);

    res.json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the booking" });
  }
});

// Endpoint for adding a new booking
app.post("/addbooking", async (req, res) => {
  try {
    // Get courts and bookings data from the database
    const { rows: courts } = await pool.query("SELECT * FROM courts");
    const { rows: bookings } = await pool.query("SELECT * FROM bookings");

    // Get get new booking data from the request
    const { user_email, court_id, booking_type } = req.body;

    // Check if the provided court_id exists in the courts table
    const court = courts.find((court) => court.id === court_id);
    if (!court) {
      return res.status(404).json({ message: "Court not found" });
    }

    // Filter the retrieved bookings data to match the court id of the new booking
    const courtBookings = bookings.filter(
      (booking) => booking.court_id === court_id
    );

    // Calculate start and end times for th new booking
    const MINUTESPERPLAY = 60;
    var startDateTime = CalculateStartDateTime(courtBookings);
    var endDateTime = new Date(
      startDateTime.getTime() + MINUTESPERPLAY * 60000
    );
    var currentDateTime = new Date();

    // Insert the new booking into the bookings table
    const insertQuery =
      "INSERT INTO bookings (user_email,booking_datetime,booking_type,court_id,play_start_time,play_end_time) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
    const values = [
      user_email,
      currentDateTime.toUTCString(),
      booking_type,
      court_id,
      startDateTime.toUTCString(),
      endDateTime.toUTCString(),
    ];
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

// Takes bookings data and calculate start time for a new booking
function CalculateStartDateTime(bookings) {
  let latestEndTime = new Date();
  const userTimezoneOffset = latestEndTime.getTimezoneOffset(); // Get local timezone offset in minutes

  for (const booking of bookings) {
    const playEndTime = new Date(booking.play_end_time);
    const adjustedEndTime = new Date(playEndTime - userTimezoneOffset * 60000);
    if (adjustedEndTime > latestEndTime) {
      latestEndTime = adjustedEndTime;
    }
  }

  return latestEndTime;
}

// Server launch
app.listen(5000, () => {
  console.log("Server has started on port 5000");
});
