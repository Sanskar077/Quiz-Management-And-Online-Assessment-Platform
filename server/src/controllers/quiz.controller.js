const quizModel = require('../models/quiz.model.js');
const {
  validateCreateQuiz,
  validateUpdateQuiz,
  validateStatus,
} = require('../validators/quiz.validator.js');

/**
 * Get all quizzes with optional filters
 * Query params: status, categoryId, search
 */
const getQuizzes = async (req, res, next) => {
  try {
    const { status, categoryId, search } = req.query;

    const filters = {};
    if (status) filters.status = status.toUpperCase();
    if (categoryId) filters.categoryId = parseInt(categoryId, 10);
    if (search) filters.searchTerm = search;

    const quizzes = await quizModel.findAll(filters);

    res.json({
      success: true,
      data: quizzes,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get quiz by ID
 */
const getQuiz = async (req, res, next) => {
  try {
    const { id } = req.params;
    const quiz = await quizModel.findById(parseInt(id, 10));

    if (!quiz) {
      const error = new Error('Quiz not found');
      error.statusCode = 404;
      throw error;
    }

    res.json({
      success: true,
      data: quiz,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create a new quiz
 */
const createQuiz = async (req, res, next) => {
  try {
    const {
      title,
      description,
      categoryId,
      difficulty,
      durationMinutes,
      passingPercentage,
      maxAttempts,
      thumbnailUrl,
    } = req.body;

    const validation = validateCreateQuiz(req.body);
    if (!validation.valid) {
      const error = new Error(validation.errors.join(', '));
      error.statusCode = 400;
      throw error;
    }

    const quiz = await quizModel.create({
      title,
      description,
      categoryId: categoryId ? parseInt(categoryId, 10) : null,
      difficulty,
      durationMinutes: parseInt(durationMinutes, 10),
      passingPercentage: passingPercentage ? parseInt(passingPercentage, 10) : 50,
      maxAttempts: maxAttempts ? parseInt(maxAttempts, 10) : null,
      thumbnailUrl,
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      data: quiz,
      message: 'Quiz created successfully',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update quiz
 */
const updateQuiz = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      categoryId,
      difficulty,
      durationMinutes,
      passingPercentage,
      maxAttempts,
      thumbnailUrl,
    } = req.body;

    const validation = validateUpdateQuiz(req.body);
    if (!validation.valid) {
      const error = new Error(validation.errors.join(', '));
      error.statusCode = 400;
      throw error;
    }

    const quiz = await quizModel.update(parseInt(id, 10), {
      title,
      description,
      categoryId: categoryId ? parseInt(categoryId, 10) : undefined,
      difficulty,
      durationMinutes: durationMinutes ? parseInt(durationMinutes, 10) : undefined,
      passingPercentage: passingPercentage ? parseInt(passingPercentage, 10) : undefined,
      maxAttempts: maxAttempts ? parseInt(maxAttempts, 10) : undefined,
      thumbnailUrl,
    });

    if (!quiz) {
      const error = new Error('Quiz not found');
      error.statusCode = 404;
      throw error;
    }

    res.json({
      success: true,
      data: quiz,
      message: 'Quiz updated successfully',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update quiz status (publish/unpublish)
 */
const updateQuizStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validation = validateStatus(status);
    if (!validation.valid) {
      const error = new Error(validation.errors.join(', '));
      error.statusCode = 400;
      throw error;
    }

    const quiz = await quizModel.updateStatus(parseInt(id, 10), status);

    if (!quiz) {
      const error = new Error('Quiz not found');
      error.statusCode = 404;
      throw error;
    }

    res.json({
      success: true,
      data: quiz,
      message: `Quiz ${status.toLowerCase()} successfully`,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete quiz
 */
const deleteQuiz = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await quizModel.deleteQuiz(parseInt(id, 10));

    if (!deleted) {
      const error = new Error('Quiz not found');
      error.statusCode = 404;
      throw error;
    }

    res.json({
      success: true,
      message: 'Quiz deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getQuizzes,
  getQuiz,
  createQuiz,
  updateQuiz,
  updateQuizStatus,
  deleteQuiz,
};
