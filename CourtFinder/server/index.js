// run nodemon index to start back-end server

const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json); // access to request.body

// ROUTES

// login

// create account in auth0 to allow gmail, facebook,
// token is sent to the API,

// create account

// check in

// join wait list

//

app.listen(5000, () => {
  console.log("server has started on port 5000");
});
