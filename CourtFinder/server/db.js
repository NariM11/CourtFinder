const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "postgreBCS",
  host: "localhost",
  port: 5432,
  database: "courtfinder",
});

module.exports = pool;
