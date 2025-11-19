
const express = require('express');
const router = express.Router();
const adminController = require('../../controllers/Admin/adminController');

router.get('/patients', adminController.getPatients);
router.get('/doctors', adminController.getDoctors);
router.get('/queue', adminController.getQueue);
router.get('/analytics/summary', adminController.getAnalytics);
router.post('/assign', adminController.assignDoctor);

module.exports = router;