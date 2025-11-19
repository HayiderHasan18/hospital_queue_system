'use strict';

const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const uploadController = require('../controllers/userProfile');

const router = express.Router();

const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.floor(Math.random()*1e6)}${ext}`);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype?.startsWith('image/')) return cb(null, true);
  cb(new Error('Only image files allowed'));
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });

router.post('/profile', upload.single('profile'), uploadController.updateProfilePicture);

module.exports = router;
