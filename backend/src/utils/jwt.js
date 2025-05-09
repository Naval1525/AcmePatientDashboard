// src/utils/jwt.js
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-for-development';
const JWT_EXPIRES_IN = '1d';

/**
 * Generate a JWT token for a user
 * @param {Object} user - User object (without password)
 * @returns {String} JWT token
 */
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
};

/**
 * Verify a JWT token
 * @param {String} token - JWT token to verify
 * @returns {Object} Decoded token payload
 */
const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

module.exports = {
  generateToken,
  verifyToken
};