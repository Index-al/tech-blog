const router = require("express").Router();
const { User } = require("../models");
const withAuth = require("../utils/auth");

// GET all posts for homepage and join with user data
router.get("/", async (req, res) => {
    try {
      res.render("homepage", {
        logged_in: req.session.logged_in,
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

// User route for logging out
router.get("/logout", (req, res) => {
    // If they are already logged out then redirect to the homepage
    if (!req.session.logged_in) {
        res.redirect("/");
        return;
    }
    res.render("logout");
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