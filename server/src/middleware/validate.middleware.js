const ApiError = require('../utils/ApiError');

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Validate registration payload. */
const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body || {};
  const errors = [];

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    errors.push('Name must be at least 2 characters');
  }
  if (name && name.trim().length > 100) {
    errors.push('Name must be at most 100 characters');
  }
  if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
    errors.push('A valid email is required');
  }
  if (!password || typeof password !== 'string' || password.length < 8) {
    errors.push('Password must be at least 8 characters');
  }

  if (errors.length > 0) {
    return next(new ApiError(400, errors.join('. ')));
  }

  req.body.name = name.trim();
  req.body.email = email.trim().toLowerCase();
  next();
};

/** Validate login payload. */
const validateLogin = (req, res, next) => {
  const { email, password } = req.body || {};

  if (!email || typeof email !== 'string' || !password || typeof password !== 'string') {
    return next(new ApiError(400, 'Email and password are required'));
  }

  req.body.email = email.trim().toLowerCase();
  next();
};

module.exports = { validateRegister, validateLogin };
