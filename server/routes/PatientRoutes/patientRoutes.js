const express = require("express");
const router = express.Router();
const auth = require("../../middlewere/auth");
const pool = require("../../config/db");

router.get("/info", auth, async (req, res) => {
  const userId = req.user.id;

  try {
    
    const [userRows] = await pool.query(
      "SELECT first_name, last_name FROM users WHERE id = ?",
      [userId]
    );

    const [patientsRows] = await pool.query(
      "SELECT address, phone, age FROM patients WHERE user_id = ?",
      [userId]
    );

    if (userRows.length === 0)
      return res.status(404).json({ message: "User not found" });

    const fullName = `${userRows[0].first_name} ${userRows[0].last_name}`;
    const { address = "", phone = "", age = "" } = patientsRows[0] || {};

    res.json({ fullName, address, phone, age });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.put("/info", auth, async (req, res) => {
  const userId = req.user.id;
  const { address, phone, age } = req.body;

  if (!address || !phone || !age) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const [existing] = await pool.query(
      "SELECT id FROM patients WHERE user_id = ?",
      [userId]
    );

    if (existing.length > 0) {
     
      await pool.query(
        "UPDATE patients SET address = ?, phone = ?, age = ? WHERE user_id = ?",
        [address, phone, age, userId]
      );
    } else {
      // Insert
      await pool.query(
        "INSERT INTO patients (user_id, address, phone, age) VALUES (?, ?, ?, ?)",
        [userId, address, phone, age]
      );
    }
  req.io?.emit("patient_info_updated", {
      userId,
      address,
      phone,
      age,
    });
    res.json({ message: "patient information saved" });
  } catch (err) {
    res.status(500).json({ message: "Database error", error: err.message });
  }
});

module.exports = router;
