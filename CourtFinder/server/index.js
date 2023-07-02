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

// ...
// Other routes for check-in, join waitlist, etc.

app.listen(5000, () => {
  console.log("Server has started on port 5000");
});
