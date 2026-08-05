const { query } = require('../config/db');

/** Data access layer for the users table. */

const PUBLIC_COLUMNS = 'id, name, email, role, status, created_at';

const findByEmail = async (email) => {
  const result = await query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0] || null;
};

const findById = async (id) => {
  const result = await query(`SELECT ${PUBLIC_COLUMNS} FROM users WHERE id = $1`, [id]);
  return result.rows[0] || null;
};

const create = async ({ name, email, password }) => {
  const result = await query(
    `INSERT INTO users (name, email, password, role, status)
     VALUES ($1, $2, $3, 'STUDENT', 'ACTIVE')
     RETURNING ${PUBLIC_COLUMNS}`,
    [name, email, password],
  );
  return result.rows[0];
};

module.exports = { findByEmail, findById, create };
