const mysql = require("mysql2");
require('dotenv').config(); // load .env variables

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: {
    rejectUnauthorized: false  // falserequired for Aiven
  }
});

db.getConnection((err, connection) => {
  if (err) {
    console.error("❌ Database connection failed:", err.message);
  } else {
    console.log("✔️ Database Connected");
    if (connection) connection.release(); // release the connection
  }
});

module.exports = db.promise(); // use async/await queries
