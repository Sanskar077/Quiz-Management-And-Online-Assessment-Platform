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

/**
 * Requires the authenticated user to have the ADMIN role.
 * Must be used after requireAuth in the middleware chain.
 */
const requireAdmin = (req, res, next) => {
  if (req.user?.role !== 'ADMIN') {
    return next(new ApiError(403, 'Admin access required'));
  }
  next();
};

/**
 * Requires the authenticated user to have the STUDENT role.
 * Must be used after requireAuth in the middleware chain.
 */
const requireStudent = (req, res, next) => {
  if (req.user?.role !== 'STUDENT') {
    return next(new ApiError(403, 'Student access required'));
  }
  next();
};

module.exports = { requireAuth, requireAdmin, requireStudent };
