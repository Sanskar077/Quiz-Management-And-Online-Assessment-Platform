-- Seed: default admin account.
-- Idempotent: does nothing if the admin email already exists.
-- Credentials (development only — change in production):
--   email:    admin@quizplatform.com
--   password: Admin@123
INSERT INTO users (name, email, password, role, status)
VALUES (
  'Platform Admin',
  'admin@quizplatform.com',
  '$2b$10$obXYPeN8RkykfbzLQeZ.FeNB7S8okJ/qRVyXlHld7uZnKfu5IjmqO',
  'ADMIN',
  'ACTIVE'
)
ON CONFLICT (email) DO NOTHING;
