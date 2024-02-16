-- DROP all existing tables
DROP TABLE IF EXISTS blog;
DROP TABLE IF EXISTS comment;
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS user_session;
DROP TABLE IF EXISTS post;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS user_sessions;

-- Setup table for blog posts/comments/etc
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL
);

INSERT INTO users (name, email, password)
VALUES
  ('John Doe', 'john@example.com', 'password'),
  ('Jane Doe', 'jane@example.com', 'password');

INSERT INTO posts (user_id, title, content) 
VALUES
  (1, 'First Post', 'This is the first post!'),
  (2, 'Second Post', 'This is the second post!');

-- Setup table for comments
CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  post_id INTEGER REFERENCES posts(id),
  content TEXT NOT NULL
);

INSERT INTO comments (user_id, post_id, content)

VALUES
  (1, 1, 'This is the first comment!'),
  (2, 1, 'This is the second comment!');

-- Setup table for sessions
CREATE TABLE user_sessions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  token VARCHAR(255) NOT NULL
);

INSERT INTO user_sessions (user_id, token)
VALUES
  (1, '1234'),
  (2, '5678');

  -- Setup table for blog posts/comments/etc
  CREATE TABLE blog (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL
  );