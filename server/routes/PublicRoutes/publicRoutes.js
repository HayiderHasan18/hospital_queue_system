const express = require('express');
const router = express.Router();
const publicController = require('../../controllers/PublicScreen/publicController');

router.get('/current-serving', publicController.getCurrentServing);

module.exports = router;
