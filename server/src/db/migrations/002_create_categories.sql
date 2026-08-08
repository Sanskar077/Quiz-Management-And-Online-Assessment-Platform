-- Migration: Create categories table
-- Categories group quizzes by topic (e.g., HTML, CSS, JavaScript, React)

CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index on slug for URL-friendly lookups
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
