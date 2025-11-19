const mysql2 = require("mysql2");

const dbConnection = mysql2.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  connectionLimit: 10,
  ssl: false
});

dbConnection.query("SELECT 'Database Connected'", (err, result) => {
  if (err) {
    console.error("❌ Database connection failed:", err.message);
  } else {
    console.log("✔️ Database Connected");
  }
});

module.exports = dbConnection.promise();
