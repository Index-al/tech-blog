-- DROP all existing tables
DROP TABLE IF EXISTS blog;
DROP TABLE IF EXISTS comment;
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS user_session;
DROP TABLE IF EXISTS post;

-- Setup table for blog posts/comments/etc
CREATE TABLE blog (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  content TEXT
);

CREATE TABLE comment (
  id SERIAL PRIMARY KEY,
  blog_id INT REFERENCES blog(id),
  content TEXT
);

CREATE TABLE user (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255),
  password VARCHAR(255)
);

CREATE TABLE user_session (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES user(id),
  token VARCHAR(255)
);

CREATE TABLE post (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  content TEXT,
  user_id INT REFERENCES user(id)
);