-- DROP all existing tables
DROP TABLE IF EXISTS blog;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS sessions;
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS user_sessions;
DROP TABLE IF EXISTS users;

-- Setup table for users
CREATE TABLE user (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


-- Populate with some test data
INSERT INTO user (username, email, password) VALUES ('testuser', 'test@example.com', 'hashedpassword');
