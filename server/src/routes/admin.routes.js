const { Router } = require('express');
const { requireAuth, requireAdmin } = require('../middleware/auth.middleware');

const router = Router();

// All admin routes require authentication + ADMIN role.
router.use(requireAuth, requireAdmin);

/**
 * GET /api/admin/ping
 * Smoke-test endpoint to verify admin-only protection.
 * Will be replaced with real admin routes from Day 4 onwards.
 */
router.get('/ping', (req, res) => {
  res.json({
    success: true,
    message: `Admin area accessible — welcome, ${req.user.name}`,
  });
});

module.exports = router;
