-- Seed: Create default categories
-- Idempotent: won't duplicate if already present

INSERT INTO categories (name, slug, description)
VALUES
  ('HTML', 'html', 'HyperText Markup Language fundamentals and best practices'),
  ('CSS', 'css', 'Cascading Style Sheets, layout, and styling'),
  ('JavaScript', 'javascript', 'Core JavaScript concepts, ES6+, and modern syntax'),
  ('React', 'react', 'React library, hooks, components, and state management'),
  ('Node.js', 'nodejs', 'Server-side JavaScript with Node.js'),
  ('General', 'general', 'Mixed topics and general programming knowledge')
ON CONFLICT (slug) DO NOTHING;
