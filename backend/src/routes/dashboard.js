// src/routes/dashboard.js
const express = require('express');
const { getDashboardOverview } = require('../controllers/dashboardController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// All dashboard routes are protected
router.use(authenticate);

router.get('/overview', getDashboardOverview);

module.exports = router;