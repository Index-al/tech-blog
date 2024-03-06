const router = require("express").Router();
const { Post, Comment, User } = require('../models');
const withAuth = require("../utils/auth");

// GET all posts for homepage and join with user data
router.get("/", async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{ model: User, attributes: ['user_id'] }],
            order: [["createdAt", "DESC"]],
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

// View a post view(/single-post)
router.get("/posts/:id", async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: Comment,
                    include: [User]
                },
                User
            ]
        });

        if (post) {
            res.render("single-post", { 
                post: post.get({ plain: true }),
                logged_in: req.session.logged_in 
            });
        } else {
            res.status(404).send("Post not found");
        }
    } catch (error) {
        res.status(500).send(error.message);
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
		const postData = await Post.findAll({
            order: [["createdAt", "DESC"]],
			where: {
				user_id: req.session.user_id,
			},
		});

		const posts = postData.map((post) => post.get({ plain: true }));

		res.render("dashboard", {
			posts,
			logged_in: req.session.logged_in,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});




// GET all posts for homepage and join with user data
router.get("/", async (req, res) => {
    try {
        const postData = await Post.findAll({
            order: [["createdAt", "DESC"]],
            include: [{ model: User, attributes: ['user_id'] }]
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

module.exports = router;