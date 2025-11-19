'use strict';

const path = require('path');
const db = require('../config/db')
exports.updateProfilePicture = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file' });
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ error: 'Missing userId' });

    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    await db.query('UPDATE users SET profile_picture = ? WHERE id = ?', [fileUrl, userId]);

    res.json({ url: fileUrl });
  } catch (err) {
    console.error('Profile picture upload error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
