const { query } = require('../config/db.js');

/** Return all categories ordered by name. */
const findAll = async () => {
  const result = await query('SELECT * FROM categories ORDER BY name ASC');
  return result.rows;
};

const findById = async (id) => {
  const result = await query('SELECT * FROM categories WHERE id = $1', [id]);
  return result.rows[0] || null;
};

module.exports = { findAll, findById };
