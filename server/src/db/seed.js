/**
 * Seed runner.
 *
 * Executes all .sql files in src/db/seeds in filename order.
 * Seeds are written to be idempotent (safe to run multiple times).
 *
 * Usage: npm run db:seed
 */
const fs = require('fs');
const path = require('path');
const { pool } = require('../config/db');

const SEEDS_DIR = path.join(__dirname, 'seeds');

const runSeeds = async () => {
  const files = fs
    .readdirSync(SEEDS_DIR)
    .filter((file) => file.endsWith('.sql'))
    .sort();

  if (files.length === 0) {
    console.log('[seed] No seed files found.');
    return;
  }

  for (const file of files) {
    const sql = fs.readFileSync(path.join(SEEDS_DIR, file), 'utf8');
    await pool.query(sql);
    console.log(`[seed] Executed: ${file}`);
  }

  console.log(`[seed] Done. ${files.length} seed file(s) executed.`);
};

runSeeds()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('[seed]', err.message);
    process.exit(1);
  });
