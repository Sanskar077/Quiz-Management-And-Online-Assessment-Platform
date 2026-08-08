const { Router } = require('express');
const { requireAuth, requireStudent } = require('../middleware/auth.middleware');

const router = Router();

// All student routes require authentication + STUDENT role.
router.use(requireAuth, requireStudent);

/**
 * GET /api/student/ping
 * Smoke-test endpoint to verify student-only protection.
 * Will be replaced with real student routes from Day 7 onwards.
 */
router.get('/ping', (req, res) => {
  res.json({
    success: true,
    message: `Student area accessible — welcome, ${req.user.name}`,
  });
});

module.exports = router;
