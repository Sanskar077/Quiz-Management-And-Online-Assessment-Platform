const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/env');
const userModel = require('../models/user.model');
const ApiError = require('../utils/ApiError');

const SALT_ROUNDS = 10;

/** Strip sensitive fields before sending a user to the client. */
const toPublicUser = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role,
  status: user.status,
  createdAt: user.created_at,
});

const signToken = (user) =>
  jwt.sign({ sub: user.id, role: user.role }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
  });

const register = async ({ name, email, password }) => {
  const existing = await userModel.findByEmail(email);
  if (existing) {
    throw new ApiError(409, 'An account with this email already exists');
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await userModel.create({ name, email, password: passwordHash });

  return { user: toPublicUser(user), token: signToken(user) };
};

const login = async ({ email, password }) => {
  const user = await userModel.findByEmail(email);

  // Same error for unknown email and wrong password — do not leak which one failed.
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new ApiError(401, 'Invalid email or password');
  }

  if (user.status !== 'ACTIVE') {
    throw new ApiError(403, 'This account has been deactivated');
  }

  return { user: toPublicUser(user), token: signToken(user) };
};

module.exports = { register, login, toPublicUser };
