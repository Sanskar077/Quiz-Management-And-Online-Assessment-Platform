const { Router } = require('express');
const { requireAuth } = require('../middleware/auth.middleware');
const categoryModel = require('../models/category.model');

const router = Router();

/** GET /api/categories — public list (both admin and student need this) */
router.get('/', requireAuth, async (req, res, next) => {
  try {
    const categories = await categoryModel.findAll();
    res.json({ success: true, data: categories });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
