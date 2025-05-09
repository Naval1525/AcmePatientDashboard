// src/middleware/auth.js
const { verifyToken } = require('../utils/jwt');
const prisma = require('../models');

/**
 * Authentication middleware to protect routes
 */
const authenticate = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization token required' });
    }

    const token = authHeader.split(' ')[1];

    // Verify token
    const decoded = verifyToken(token);

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true
      }
    });

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized', error: error.message });
  }
};

module.exports = {
  authenticate
};