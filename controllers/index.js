// Purpose: This file will be used to import all of our routes and export them to be used in server.js

const router = require("express").Router();
const api = require("./api");
const homeRoutes = require("./homeRoute");
const postRoutes = require('./postController');

// When we require this file in server.js, we'll get back a function that takes in the app object
console.log("Hitting index controllers!");
router.use("/", homeRoutes);
router.use("/api", api);
router.use('/posts/new', postRoutes);

// Export the router to be used in server.js
module.exports = router;