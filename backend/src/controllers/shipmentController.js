// src/controllers/shipmentController.js
const prisma = require('../models');

/**
 * Get all shipments for a user
 */
const getShipments = async (req, res) => {
  try {
    const userId = req.user.id;

    const shipments = await prisma.shipment.findMany({
      where: { userId },
      orderBy: { expectedDate: 'desc' }
    });

    res.json(shipments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Get a single shipment
 */
const getShipment = async (req, res) => {
  try {
    const userId = req.user.id;
    const shipmentId = req.params.id;

    const shipment = await prisma.shipment.findFirst({
      where: {
        id: shipmentId,
        userId
      }
    });

    if (!shipment) {
      return res.status(404).json({ message: 'Shipment not found' });
    }

    res.json(shipment);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Get upcoming shipments for a user
 */
const getUpcomingShipments = async (req, res) => {
  try {
    const userId = req.user.id;
    const now = new Date();

    const shipments = await prisma.shipment.findMany({
      where: {
        userId,
        expectedDate: {
          gte: now
        },
        status: {
          not: 'delivered'
        }
      },
      orderBy: { expectedDate: 'asc' }
    });

    res.json(shipments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Get past shipments for a user
 */
const getPastShipments = async (req, res) => {
  try {
    const userId = req.user.id;
    const now = new Date();

    const shipments = await prisma.shipment.findMany({
      where: {
        userId,
        OR: [
          {
            expectedDate: {
              lt: now
            }
          },
          {
            status: 'delivered'
          }
        ]
      },
      orderBy: { expectedDate: 'desc' }
    });

    res.json(shipments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// NOTE: In a real app, shipment creation would likely be handled by an admin system
// This is included for demo purposes and to populate data
const createShipment = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      status,
      trackingNumber,
      expectedDate,
      deliveredDate,
      medicationType,
      dosage
    } = req.body;

    const shipment = await prisma.shipment.create({
      data: {
        status,
        trackingNumber,
        expectedDate: new Date(expectedDate),
        deliveredDate: deliveredDate ? new Date(deliveredDate) : null,
        medicationType,
        dosage,
        userId
      }
    });

    res.status(201).json({
      message: 'Shipment created successfully',
      shipment
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getShipments,
  getShipment,
  getUpcomingShipments,
  getPastShipments,
  createShipment
};