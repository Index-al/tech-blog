// Purpose: This file is used to export the user routes to be used in server.js

const router = require("express").Router();
const userRoutes = require("./userRoutes");

// Use /users for all user routes
router.use("/users", userRoutes);

// Export the router to be used in server.js
module.exports = router;