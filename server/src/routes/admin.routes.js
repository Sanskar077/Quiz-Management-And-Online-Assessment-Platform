const { Router } = require('express');
const { requireAuth, requireAdmin } = require('../middleware/auth.middleware');
const { getDashboard } = require('../controllers/admin.controller');

const router = Router();

// All admin routes require authentication + ADMIN role.
router.use(requireAuth, requireAdmin);

router.get('/dashboard', getDashboard);

module.exports = router;
