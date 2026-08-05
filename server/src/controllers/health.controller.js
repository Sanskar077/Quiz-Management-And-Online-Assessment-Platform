const { checkConnection } = require('../config/db');

/**
 * GET /api/health
 * Reports API and database status.
 */
const getHealth = async (req, res) => {
  let database = 'disconnected';

  try {
    await checkConnection();
    database = 'connected';
  } catch {
    // Database unreachable — report status without failing the endpoint.
  }

  res.status(200).json({
    success: true,
    data: {
      status: 'ok',
      database,
      timestamp: new Date().toISOString(),
    },
  });
};

module.exports = { getHealth };
