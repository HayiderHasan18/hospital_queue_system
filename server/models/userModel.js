const db = require("../config/db");

const createUser = async (userData) => {
  const { first_name, last_name, gender, role, email, password } = userData;
  const sql = `INSERT INTO users (first_name, last_name, gender, role, email, password)
               VALUES (?, ?, ?, ?, ?, ?)`;
  return db.execute(sql, [first_name, last_name, gender, role, email, password]);
};

const findUserByEmail = async (email) => {
  const sql = "SELECT * FROM users WHERE email = ?";
  const [results] = await db.execute(sql, [email]);
  return results;
};

module.exports = { createUser, findUserByEmail };
