// src/controllers/weightController.js
const prisma = require('../models');

/**
 * Add new weight entry
 */
const addWeight = async (req, res) => {
  try {
    const userId = req.user.id;
    const { weight, date, notes } = req.body;

    const weightEntry = await prisma.weight.create({
      data: {
        weight: parseFloat(weight),
        date: date ? new Date(date) : new Date(),
        notes,
        userId
      }
    });

    res.status(201).json({
      message: 'Weight entry added successfully',
      weight: weightEntry
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Get all weight entries for a user
 */
const getWeights = async (req, res) => {
  try {
    const userId = req.user.id;

    const weights = await prisma.weight.findMany({
      where: { userId },
      orderBy: { date: 'asc' }
    });

    res.json(weights);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Get a single weight entry
 */
const getWeight = async (req, res) => {
  try {
    const userId = req.user.id;
    const weightId = req.params.id;

    const weight = await prisma.weight.findFirst({
      where: {
        id: weightId,
        userId
      }
    });

    if (!weight) {
      return res.status(404).json({ message: 'Weight entry not found' });
    }

    res.json(weight);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Update a weight entry
 */
const updateWeight = async (req, res) => {
  try {
    const userId = req.user.id;
    const weightId = req.params.id;
    const { weight, date, notes } = req.body;

    // Check if weight entry exists and belongs to user
    const existingWeight = await prisma.weight.findFirst({
      where: {
        id: weightId,
        userId
      }
    });

    if (!existingWeight) {
      return res.status(404).json({ message: 'Weight entry not found' });
    }

    // Update weight entry
    const updatedWeight = await prisma.weight.update({
      where: { id: weightId },
      data: {
        weight: weight ? parseFloat(weight) : undefined,
        date: date ? new Date(date) : undefined,
        notes: notes !== undefined ? notes : undefined
      }
    });

    res.json({
      message: 'Weight entry updated successfully',
      weight: updatedWeight
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Delete a weight entry
 */
const deleteWeight = async (req, res) => {
  try {
    const userId = req.user.id;
    const weightId = req.params.id;

    // Check if weight entry exists and belongs to user
    const existingWeight = await prisma.weight.findFirst({
      where: {
        id: weightId,
        userId
      }
    });

    if (!existingWeight) {
      return res.status(404).json({ message: 'Weight entry not found' });
    }

    // Delete weight entry
    await prisma.weight.delete({
      where: { id: weightId }
    });

    res.json({ message: 'Weight entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  addWeight,
  getWeights,
  getWeight,
  updateWeight,
  deleteWeight
};