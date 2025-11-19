const express = require('express');
const router = express.Router();
const patientController = require('../../controllers/patient/patientController');

router.get('/dashboard', patientController.getDashboard);

router.post('/update-queue', patientController.updateQueue);
module.exports = router;
