const router = require("express").Router();
const { Post, User } = require("../models");
const withAuth = require("../utils/auth");

// GET all posts for homepage and join with user data
router.get("/", async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{ model: User, attributes: ['username'] }]
        });
        const posts = postData.map(post => post.get({ plain: true }));
        res.render("home", {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// User route for logging in
router.get("/login", (req, res) => {
    // If they are already logged in then redirect to the homepage
    if (req.session.logged_in) {
        res.redirect("/");
    return;
    }
    res.render("login");
});

// Create a new post view(/create-post)
router.get("/dashboard/new", withAuth, async (req, res) => {
    try {
        res.render("create-post", {
            logged_in: true,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// User route for logging out
router.get("/logout", (req, res) => {
    // If they are already logged out then redirect to the homepage
    if (!req.session.logged_in) {
        res.redirect("/");
        return;
    }
    res.render("logout");
});

// Dashboard for viewing all user's posts
router.get("/dashboard", withAuth, async (req, res) => {
    try {
        res.render("dashboard", {
            logged_in: true,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// User route for account info
router.get("/account", withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ["password"] }, // Exclude the password for security reasons
        });
        const user = userData.get({ plain: true });
        res.render("account", {
            ...user,
            logged_in: true,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// User route for creating a new account
router.get("/signup", (req, res) => {
    // If they are already logged in then redirect to the homepage
    if (req.session.logged_in) {
        res.redirect("/");
        return;
    }
    res.render("signup");
});

// User route for creating a new post
router.get("/newpost", withAuth, async (req, res) => {
    try {
        res.render("newpost", {
            logged_in: true,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// User route for editing a post
router.get("/editpost", withAuth, async (req, res) => {
    try {
        res.render("editpost", {
            logged_in: true,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// User route for viewing a post
router.get("/viewpost", withAuth, async (req, res) => {
    try {
        res.render("viewpost", {
            logged_in: true,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// User route for deleting a post
router.get("/deletepost", withAuth, async (req, res) => {
    try {
        res.render("deletepost", {
            logged_in: true,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;