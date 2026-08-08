const { query } = require('../config/db');

/**
 * Collect all platform-wide summary statistics for the admin dashboard.
 * Tables that don't exist yet (quizzes, questions, attempts) safely return 0
 * so the API contract is stable across the full 14-day build.
 */
const getDashboardStats = async () => {
  // --- Users ---
  const usersResult = await query(`
    SELECT
      COUNT(*)                                      AS total_students,
      COUNT(*) FILTER (WHERE status = 'ACTIVE')     AS active_students,
      COUNT(*) FILTER (WHERE status = 'INACTIVE')   AS inactive_students
    FROM users
    WHERE role = 'STUDENT'
  `);

  const { total_students, active_students, inactive_students } = usersResult.rows[0];

  // --- Quizzes (table added on Day 5) ---
  let quizStats = {
    total_quizzes: 0,
    published_quizzes: 0,
    draft_quizzes: 0,
    unpublished_quizzes: 0,
  };
  try {
    const quizResult = await query(`
      SELECT
        COUNT(*)                                          AS total_quizzes,
        COUNT(*) FILTER (WHERE status = 'PUBLISHED')     AS published_quizzes,
        COUNT(*) FILTER (WHERE status = 'DRAFT')         AS draft_quizzes,
        COUNT(*) FILTER (WHERE status = 'UNPUBLISHED')   AS unpublished_quizzes
      FROM quizzes
    `);
    quizStats = quizResult.rows[0];
  } catch {
    // quizzes table not yet created — return zeros
  }

  // --- Questions (table added on Day 6) ---
  let totalQuestions = 0;
  try {
    const qResult = await query('SELECT COUNT(*) AS total_questions FROM questions');
    totalQuestions = parseInt(qResult.rows[0].total_questions, 10);
  } catch {
    // questions table not yet created — return zero
  }

  // --- Attempts (table added on Day 8) ---
  let attemptStats = {
    total_attempts: 0,
    passed_attempts: 0,
    failed_attempts: 0,
    avg_score: 0,
  };
  try {
    const aResult = await query(`
      SELECT
        COUNT(*)                                         AS total_attempts,
        COUNT(*) FILTER (WHERE status = 'PASSED')        AS passed_attempts,
        COUNT(*) FILTER (WHERE status = 'FAILED')        AS failed_attempts,
        COALESCE(ROUND(AVG(percentage)::numeric, 1), 0)  AS avg_score
      FROM attempts
    `);
    attemptStats = aResult.rows[0];
  } catch {
    // attempts table not yet created — return zeros
  }

  return {
    totalStudents: parseInt(total_students, 10),
    activeStudents: parseInt(active_students, 10),
    inactiveStudents: parseInt(inactive_students, 10),
    totalQuizzes: parseInt(quizStats.total_quizzes, 10),
    publishedQuizzes: parseInt(quizStats.published_quizzes, 10),
    draftQuizzes: parseInt(quizStats.draft_quizzes, 10),
    unpublishedQuizzes: parseInt(quizStats.unpublished_quizzes, 10),
    totalQuestions: totalQuestions,
    totalAttempts: parseInt(attemptStats.total_attempts, 10),
    passedAttempts: parseInt(attemptStats.passed_attempts, 10),
    failedAttempts: parseInt(attemptStats.failed_attempts, 10),
    averageScore: parseFloat(attemptStats.avg_score),
  };
};

module.exports = { getDashboardStats };
