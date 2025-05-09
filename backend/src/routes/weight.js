// src/routes/weight.js
const express = require('express');
const {
  addWeight,
  getWeights,
  getWeight,
  updateWeight,
  deleteWeight
} = require('../controllers/weightController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// All weight routes are protected
router.use(authenticate);

router.post('/', addWeight);
router.get('/', getWeights);
router.get('/:id', getWeight);
router.put('/:id', updateWeight);
router.delete('/:id', deleteWeight);

module.exports = router;