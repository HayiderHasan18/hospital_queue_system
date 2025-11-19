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
    const [doctorRows] = await pool.query(
      "SELECT speciality, phone, room FROM doctors WHERE user_id = ?",
      [userId]
    );

    if (userRows.length === 0)
      return res.status(404).json({ message: "User not found" });

    const fullName = `${userRows[0].first_name} ${userRows[0].last_name}`;
    const { speciality = "", phone = "", room = "" } = doctorRows[0] || {};

    res.json({ fullName, speciality, phone, room });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


router.put("/info", auth, async (req, res) => {
  const userId = req.user.id;
  const { speciality, phone, room } = req.body;

  
  if (!speciality || !phone || !room) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const [existing] = await pool.query(
      "SELECT id FROM doctors WHERE user_id = ?",
      [userId]
    );

    if (existing.length > 0) {
      // Update
      await pool.query(
        "UPDATE doctors SET speciality = ?, phone = ?, room = ? WHERE user_id = ?",
        [speciality, phone, room, userId]
      );
    } else {
      // Insert
      await pool.query(
        "INSERT INTO doctors (user_id, speciality, phone, room) VALUES (?, ?, ?, ?)",
        [userId, speciality, phone, room]
      );
    }
     req.io.emit("doctor_info_updated", { userId, speciality, phone, room });
    res.json({ message: "Doctor information saved" });
  } catch (err) {
    res.status(500).json({ message: "Database error", error: err.message });
  }
});

module.exports = router;
