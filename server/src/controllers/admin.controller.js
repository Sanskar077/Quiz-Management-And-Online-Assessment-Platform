const dashboardService = require('../services/dashboard.service');

/** GET /api/admin/dashboard */
const getDashboard = async (req, res, next) => {
  try {
    const stats = await dashboardService.getDashboardStats();
    res.status(200).json({ success: true, data: stats });
  } catch (err) {
    next(err);
  }
};

module.exports = { getDashboard };
