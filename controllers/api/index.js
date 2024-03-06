// Purpose: This file is used to export the user routes to be used in server.js

const router = require("express").Router();
const userController = require("./userController");
const postController = require("./postController");
const commentController = require("./commentController");

// Routes for user, post, and comment controllers
router.use('/users', userController);
router.use('/posts', postController);
router.use('/comments', commentController);

// Export the router to be used in server.js
module.exports = router;