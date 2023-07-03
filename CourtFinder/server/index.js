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

app.get("/getcourts", async (req, res) => {
  try {
    // Query the database to retrieve courts
    const query = "SELECT * FROM courts";
    const { rows: courts } = await pool.query(query);

    // Send the retrieved courts as the response
    res.json(courts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/getusers", async (req, res) => {
  try {
    // Query the database to retrieve courts
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

// Route for adding a new booking
// TODO - fix this route
app.post("/addbooking", (req, res) => {
  const { user_email, court_id, booking_datetime, booking_type } = req.body;

  // Insert the new booking into the database
  const query =
    "INSERT INTO bookings (user_email, court_id, booking_datetime, booking_type) VALUES ($1, $2, $3, $4)";
  const values = [user_email, court_id, booking_datetime, booking_type];

  pool.query(query, values, (error, result) => {
    if (error) {
      console.error("Error adding booking:", error);
      res.status(500).send("Error adding booking");
    } else {
      res.status(200).send("Booking added successfully");
    }
  });
});

// ...
// Other routes for check-in, join waitlist, etc.

app.listen(5000, () => {
  console.log("Server has started on port 5000");
});
