/**
 * Simple forward-only migration runner.
 *
 * - Reads .sql files from src/db/migrations in filename order (001_..., 002_...).
 * - Tracks applied migrations in a `migrations` table.
 * - Applies each pending migration inside a transaction.
 *
 * Usage: npm run db:migrate
 */
const fs = require('fs');
const path = require('path');
const { pool } = require('../config/db');

const MIGRATIONS_DIR = path.join(__dirname, 'migrations');

const ensureMigrationsTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS migrations (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) UNIQUE NOT NULL,
      applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
};

const getAppliedMigrations = async () => {
  const result = await pool.query('SELECT name FROM migrations ORDER BY name');
  return new Set(result.rows.map((row) => row.name));
};

const runMigrations = async () => {
  await ensureMigrationsTable();
  const applied = await getAppliedMigrations();

  const files = fs
    .readdirSync(MIGRATIONS_DIR)
    .filter((file) => file.endsWith('.sql'))
    .sort();

  const pending = files.filter((file) => !applied.has(file));

  if (pending.length === 0) {
    console.log('[migrate] No pending migrations.');
    return;
  }

  for (const file of pending) {
    const sql = fs.readFileSync(path.join(MIGRATIONS_DIR, file), 'utf8');
    const client = await pool.connect();

    try {
      await client.query('BEGIN');
      await client.query(sql);
      await client.query('INSERT INTO migrations (name) VALUES ($1)', [file]);
      await client.query('COMMIT');
      console.log(`[migrate] Applied: ${file}`);
    } catch (err) {
      await client.query('ROLLBACK');
      throw new Error(`Migration failed (${file}): ${err.message}`);
    } finally {
      client.release();
    }
  }

  console.log(`[migrate] Done. ${pending.length} migration(s) applied.`);
};

runMigrations()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('[migrate]', err.message);
    process.exit(1);
  });
