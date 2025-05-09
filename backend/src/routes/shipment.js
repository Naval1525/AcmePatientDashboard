// src/routes/shipment.js
const express = require('express');
const {
  getShipments,
  getShipment,
  getUpcomingShipments,
  getPastShipments,
  createShipment
} = require('../controllers/shipmentController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// All shipment routes are protected
router.use(authenticate);

router.get('/', getShipments);
router.get('/upcoming', getUpcomingShipments);
router.get('/past', getPastShipments);
router.get('/:id', getShipment);
router.post('/', createShipment); // For demo purposes

module.exports = router;