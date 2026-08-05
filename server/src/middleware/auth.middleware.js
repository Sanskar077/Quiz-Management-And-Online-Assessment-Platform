const jwt = require('jsonwebtoken');
const config = require('../config/env');
const userModel = require('../models/user.model');
const ApiError = require('../utils/ApiError');

/**
 * Requires a valid Bearer token. Loads the current user from the database
 * so role/status changes take effect immediately, and attaches it as req.user.
 */
const requireAuth = async (req, res, next) => {
  try {
    const header = req.headers.authorization || '';
    const [scheme, token] = header.split(' ');

    if (scheme !== 'Bearer' || !token) {
      throw new ApiError(401, 'Authentication required');
    }

    let payload;
    try {
      payload = jwt.verify(token, config.jwtSecret);
    } catch {
      throw new ApiError(401, 'Invalid or expired token');
    }

    const user = await userModel.findById(payload.sub);
    if (!user) {
      throw new ApiError(401, 'Account no longer exists');
    }
    if (user.status !== 'ACTIVE') {
      throw new ApiError(403, 'This account has been deactivated');
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { requireAuth };
