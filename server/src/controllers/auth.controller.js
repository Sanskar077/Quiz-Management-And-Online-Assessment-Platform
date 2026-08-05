const authService = require('../services/auth.service');

/** POST /api/auth/register */
const register = async (req, res, next) => {
  try {
    const { user, token } = await authService.register(req.body);
    res.status(201).json({ success: true, data: { user, token } });
  } catch (err) {
    next(err);
  }
};

/** POST /api/auth/login */
const login = async (req, res, next) => {
  try {
    const { user, token } = await authService.login(req.body);
    res.status(200).json({ success: true, data: { user, token } });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/auth/logout
 * Stateless JWT: the client discards the token. This endpoint exists so the
 * frontend has a single, consistent logout call.
 */
const logout = (req, res) => {
  res.status(200).json({ success: true, message: 'Logged out successfully' });
};

/** GET /api/auth/me — current authenticated user (used to restore sessions). */
const me = (req, res) => {
  res.status(200).json({ success: true, data: { user: req.user } });
};

module.exports = { register, login, logout, me };
