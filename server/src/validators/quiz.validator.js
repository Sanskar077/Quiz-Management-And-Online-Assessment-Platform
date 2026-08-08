/**
 * Validation schemas for quiz operations
 */

const validateCreateQuiz = (data) => {
  const errors = [];

  if (!data.title || data.title.trim().length === 0) {
    errors.push('Title is required');
  }

  if (data.title && data.title.length > 255) {
    errors.push('Title must be 255 characters or less');
  }

  if (!data.durationMinutes || data.durationMinutes <= 0) {
    errors.push('Duration must be greater than 0 minutes');
  }

  if (data.passingPercentage !== undefined) {
    const pp = parseInt(data.passingPercentage, 10);
    if (isNaN(pp) || pp < 0 || pp > 100) {
      errors.push('Passing percentage must be between 0 and 100');
    }
  }

  if (data.maxAttempts !== undefined && data.maxAttempts !== null) {
    const ma = parseInt(data.maxAttempts, 10);
    if (isNaN(ma) || ma <= 0) {
      errors.push('Max attempts must be greater than 0');
    }
  }

  if (data.difficulty && !['EASY', 'MEDIUM', 'HARD'].includes(data.difficulty)) {
    errors.push('Difficulty must be EASY, MEDIUM, or HARD');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

const validateUpdateQuiz = (data) => {
  const errors = [];

  if (data.title !== undefined) {
    if (!data.title || data.title.trim().length === 0) {
      errors.push('Title cannot be empty');
    }
    if (data.title.length > 255) {
      errors.push('Title must be 255 characters or less');
    }
  }

  if (data.durationMinutes !== undefined && data.durationMinutes <= 0) {
    errors.push('Duration must be greater than 0 minutes');
  }

  if (data.passingPercentage !== undefined) {
    const pp = parseInt(data.passingPercentage, 10);
    if (isNaN(pp) || pp < 0 || pp > 100) {
      errors.push('Passing percentage must be between 0 and 100');
    }
  }

  if (data.maxAttempts !== undefined && data.maxAttempts !== null) {
    const ma = parseInt(data.maxAttempts, 10);
    if (isNaN(ma) || ma <= 0) {
      errors.push('Max attempts must be greater than 0');
    }
  }

  if (data.difficulty && !['EASY', 'MEDIUM', 'HARD'].includes(data.difficulty)) {
    errors.push('Difficulty must be EASY, MEDIUM, or HARD');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

const validateStatus = (status) => {
  const validStatuses = ['DRAFT', 'PUBLISHED', 'UNPUBLISHED'];
  return {
    valid: validStatuses.includes(status),
    errors: validStatuses.includes(status) ? [] : ['Invalid status'],
  };
};

module.exports = {
  validateCreateQuiz,
  validateUpdateQuiz,
  validateStatus,
};
