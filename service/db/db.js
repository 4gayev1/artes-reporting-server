const { Pool } = require("pg");

const pool = new Pool({
  host: "db",
  port: 5432,
  user: "artes",
  password: "artes",
  database: "artes_reports",
});

module.exports = pool;
