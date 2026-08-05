const { Pool } = require('pg');
const config = require('./env');

if (!config.databaseUrl) {
  console.warn('[db] DATABASE_URL is not set. Database features will fail until it is configured.');
}

// Hosted PostgreSQL providers (Neon, Supabase) require SSL.
const pool = new Pool({
  connectionString: config.databaseUrl,
  ssl: { rejectUnauthorized: false },
});

pool.on('error', (err) => {
  console.error('[db] Unexpected error on idle client', err);
});

/**
 * Run a parameterized query against the pool.
 * Always use parameterized queries ($1, $2, ...) — never string interpolation.
 */
const query = (text, params) => pool.query(text, params);

/** Verify the database is reachable. Used by the health check. */
const checkConnection = async () => {
  const result = await pool.query('SELECT 1 AS ok');
  return result.rows[0].ok === 1;
};

module.exports = { pool, query, checkConnection };
