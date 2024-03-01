-- DROP all existing tables
DROP TABLE IF EXISTS blog;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS sessions;
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS user_sessions;
DROP TABLE IF EXISTS users;

-- Setup table for users
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Setup table for blog posts
CREATE TABLE posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Setup table for comments
CREATE TABLE comments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  postId INT NOT NULL,
  content TEXT NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Populate with some test data
INSERT INTO users (username, email, password) VALUES ('testuser', 'test@example.com', 'hashedpassword');

INSERT INTO posts (title, content) VALUES ('First Post', 'This is the first post on the blog');
INSERT INTO posts (title, content) VALUES ('Second Post', 'This is the second post on the blog');
INSERT INTO posts (title, content) VALUES ('Third Post', 'This is the third post on the blog');

INSERT INTO comments (postId, content) VALUES (1, 'This is a comment on the first post');
INSERT INTO comments (postId, content) VALUES (2, 'This is a comment on the second post');
INSERT INTO comments (postId, content) VALUES (3, 'This is a comment on the third post');