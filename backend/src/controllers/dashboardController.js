// src/controllers/dashboardController.js
const prisma = require('../models');

/**
 * Get dashboard overview data
 */
const getDashboardOverview = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get user profile
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        firstName: true,
        lastName: true,
        height: true,
        targetWeight: true
      }
    });

    // Get most recent weight entry
    const latestWeight = await prisma.weight.findFirst({
      where: { userId },
      orderBy: { date: 'desc' }
    });

    // Get first weight entry to calculate total progress
    const firstWeight = await prisma.weight.findFirst({
      where: { userId },
      orderBy: { date: 'asc' }
    });

    // Calculate weight loss and progress percentage
    let weightLoss = null;
    let progressPercentage = null;

    if (latestWeight && firstWeight) {
      weightLoss = firstWeight.weight - latestWeight.weight;
    }

    if (weightLoss && user.targetWeight && firstWeight) {
      const totalWeightToLose = firstWeight.weight - user.targetWeight;
      progressPercentage = totalWeightToLose > 0
        ? Math.min(100, Math.round((weightLoss / totalWeightToLose) * 100))
        : 0;
    }

    // Get next shipment
    const nextShipment = await prisma.shipment.findFirst({
      where: {
        userId,
        status: {
          not: 'delivered'
        }
      },
      orderBy: { expectedDate: 'asc' }
    });

    // Calculate BMI if height and weight are available
    let bmi = null;
    if (user.height && latestWeight) {
      // BMI = weight(kg) / height(m)^2
      const heightInMeters = user.height / 100;
      bmi = latestWeight.weight / (heightInMeters * heightInMeters);
      bmi = Math.round(bmi * 10) / 10; // Round to 1 decimal place
    }

    res.json({
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        targetWeight: user.targetWeight
      },
      currentWeight: latestWeight?.weight || null,
      weightLoss: weightLoss,
      weightLossPercentage: progressPercentage,
      bmi: bmi,
      nextShipment: nextShipment || null
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getDashboardOverview
};