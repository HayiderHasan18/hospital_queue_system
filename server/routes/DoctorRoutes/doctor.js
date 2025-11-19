const express = require('express');
const router = express.Router();
const doctorController = require('../../controllers/Doctors/doctorController');


router.get('/patients', doctorController.getDoctorPatients);


router.post('/call-patient', doctorController.callPatient);


router.post('/start-consultation', doctorController.startConsultation);


router.post('/mark-served', doctorController.markServed);

module.exports = router;
