-- Migration: Create quizzes table
-- Quizzes belong to categories (added in next migration) and are created by admin users

CREATE TABLE IF NOT EXISTS quizzes (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
  difficulty VARCHAR(20) CHECK (difficulty IN ('EASY', 'MEDIUM', 'HARD')) DEFAULT 'MEDIUM',
  duration_minutes INTEGER NOT NULL CHECK (duration_minutes > 0),
  passing_percentage INTEGER NOT NULL CHECK (passing_percentage >= 0 AND passing_percentage <= 100) DEFAULT 50,
  max_attempts INTEGER CHECK (max_attempts > 0),
  status VARCHAR(20) CHECK (status IN ('DRAFT', 'PUBLISHED', 'UNPUBLISHED')) DEFAULT 'DRAFT',
  thumbnail_url TEXT,
  created_by INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index on status for filtering published quizzes
CREATE INDEX IF NOT EXISTS idx_quizzes_status ON quizzes(status);

-- Index on category for filtering by category
CREATE INDEX IF NOT EXISTS idx_quizzes_category ON quizzes(category_id);

-- Index on created_by for admin audit
CREATE INDEX IF NOT EXISTS idx_quizzes_created_by ON quizzes(created_by);
