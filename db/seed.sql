-- Setup table for blog posts
CREATE TABLE posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  body TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Seed the database with some initial data
INSERT INTO posts (title, body) VALUES
  ('Hello World', 'This is my first blog post!'),
  ('Goodbye World', 'This is my last blog post.');