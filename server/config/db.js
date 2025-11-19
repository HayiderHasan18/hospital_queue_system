const mysql2 = require("mysql2");

// Create the pool
const dbConnection = mysql2.createPool({
  host: "localhost",
  user: "heydara",
  password: "heydara18",
  database: "hospital_queue",
  connectionLimit: 10,
});


dbConnection.query("SELECT 'Database Connected'", (err, result) => {
  if (err) {
    console.error("Database connection failed:", err.message);
  } else {
    console.log(result[0]);
  }
});

//Export the promise-enabled pool
module.exports = dbConnection.promise();
