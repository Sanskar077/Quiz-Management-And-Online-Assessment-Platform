const express = require('express');
const quizController = require('../controllers/quiz.controller.js');
const { requireAuth, requireAdmin } = require('../middleware/auth.middleware.js');

const router = express.Router();

// All quiz management routes require admin
router.use(requireAuth);
router.use(requireAdmin);

// GET /api/quizzes - Get all quizzes with optional filters
router.get('/', quizController.getQuizzes);

// GET /api/quizzes/:id - Get quiz by ID
router.get('/:id', quizController.getQuiz);

// POST /api/quizzes - Create new quiz
router.post('/', quizController.createQuiz);

// PUT /api/quizzes/:id - Update quiz
router.put('/:id', quizController.updateQuiz);

// PATCH /api/quizzes/:id/status - Update quiz status
router.patch('/:id/status', quizController.updateQuizStatus);

// DELETE /api/quizzes/:id - Delete quiz
router.delete('/:id', quizController.deleteQuiz);

module.exports = router;
