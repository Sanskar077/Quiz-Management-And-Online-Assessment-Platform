const config = require('../config/env');

/** 404 handler for unknown routes. */
const notFound = (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
};

/** Centralized error handler — never leaks stack traces in production. */
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  if (config.env === 'development') {
    console.error('[error]', err);
  }

  res.status(statusCode).json({
    success: false,
    message:
      statusCode === 500 && config.env !== 'development' ? 'Internal server error' : err.message,
  });
};

module.exports = { notFound, errorHandler };
