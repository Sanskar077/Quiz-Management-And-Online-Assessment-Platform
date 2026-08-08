const { query } = require('../config/db.js');

/**
 * Quiz model — all database operations for the quizzes table.
 * Uses the named `query` helper from config/db so every call is parameterized.
 */

const BASE_SELECT = `
  SELECT
    q.id, q.title, q.description, q.category_id,
    c.name  AS category_name, c.slug AS category_slug,
    q.difficulty, q.duration_minutes, q.passing_percentage,
    q.max_attempts, q.status, q.thumbnail_url,
    q.created_by, u.name AS created_by_name,
    q.created_at, q.updated_at
  FROM quizzes q
  LEFT JOIN categories c ON q.category_id = c.id
  LEFT JOIN users      u ON q.created_by  = u.id
`;

/** Return all quizzes, optionally filtered by status, category, or search term. */
const findAll = async (filters = {}) => {
  let sql = BASE_SELECT + ' WHERE 1=1';
  const values = [];
  let i = 1;

  if (filters.status) {
    sql += ` AND q.status = $${i++}`;
    values.push(filters.status);
  }
  if (filters.categoryId) {
    sql += ` AND q.category_id = $${i++}`;
    values.push(filters.categoryId);
  }
  if (filters.searchTerm) {
    sql += ` AND (q.title ILIKE $${i} OR q.description ILIKE $${i})`;
    values.push(`%${filters.searchTerm}%`);
    i++;
  }

  sql += ' ORDER BY q.created_at DESC';
  const result = await query(sql, values);
  return result.rows;
};

/** Return a single quiz by id, joined with category and creator. */
const findById = async (id) => {
  const result = await query(BASE_SELECT + ' WHERE q.id = $1', [id]);
  return result.rows[0] || null;
};

/** Insert a new quiz (always starts as DRAFT). */
const create = async ({
  title,
  description,
  categoryId,
  difficulty,
  durationMinutes,
  passingPercentage,
  maxAttempts,
  thumbnailUrl,
  createdBy,
}) => {
  const sql = `
    INSERT INTO quizzes (
      title, description, category_id, difficulty, duration_minutes,
      passing_percentage, max_attempts, thumbnail_url, created_by, status
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 'DRAFT')
    RETURNING *
  `;
  const result = await query(sql, [
    title,
    description || null,
    categoryId || null,
    difficulty || 'MEDIUM',
    durationMinutes,
    passingPercentage ?? 50,
    maxAttempts || null,
    thumbnailUrl || null,
    createdBy,
  ]);
  return result.rows[0];
};

/** Partial update — only columns supplied in updateData are changed. */
const update = async (
  id,
  {
    title,
    description,
    categoryId,
    difficulty,
    durationMinutes,
    passingPercentage,
    maxAttempts,
    thumbnailUrl,
  },
) => {
  const sql = `
    UPDATE quizzes
    SET
      title              = COALESCE($1, title),
      description        = COALESCE($2, description),
      category_id        = COALESCE($3, category_id),
      difficulty         = COALESCE($4, difficulty),
      duration_minutes   = COALESCE($5, duration_minutes),
      passing_percentage = COALESCE($6, passing_percentage),
      max_attempts       = COALESCE($7, max_attempts),
      thumbnail_url      = COALESCE($8, thumbnail_url),
      updated_at         = CURRENT_TIMESTAMP
    WHERE id = $9
    RETURNING *
  `;
  const result = await query(sql, [
    title,
    description,
    categoryId,
    difficulty,
    durationMinutes,
    passingPercentage,
    maxAttempts,
    thumbnailUrl,
    id,
  ]);
  return result.rows[0] || null;
};

/** Set a new status: DRAFT | PUBLISHED | UNPUBLISHED. */
const updateStatus = async (id, status) => {
  const result = await query(
    `UPDATE quizzes SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *`,
    [status, id],
  );
  return result.rows[0] || null;
};

/** Hard-delete a quiz. Returns true if a row was removed. */
const deleteQuiz = async (id) => {
  const result = await query('DELETE FROM quizzes WHERE id = $1 RETURNING id', [id]);
  return result.rowCount > 0;
};

module.exports = { findAll, findById, create, update, updateStatus, deleteQuiz };
