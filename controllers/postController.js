const router = require('express').Router();
const { Post } = require('../models');
const { User } = require('../models');
const express = require('express');
const app = express();
app.use(express.json());
const withAuth = require('../utils/auth');


// Get all posts
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{ model: User, attributes: ['user_id'] }]
        });
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get a single post by id
router.get("/:id", async (req, res) => {
	try {
		const postData = await Post.findByPk(req.params.id, {
			include: [{ model: User, attributes: ["user_id"] }],
		});
		if (!postData) {
			res.status(404).json({ message: "No post found with this id!" });
			return;
		}
		res.status(200).json(postData);
	} catch (err) {
		res.status(500).json(err);
	}
});

// Create a new post
router.post('/', async (req, res) => {
    try {
        const postData = await Post.create({
            // POST DATA
            user_id: req.session.user_id,
            title: req.body.title,
            content: req.body.content,
            post_url: req.body.post_url,
            post_date: req.body.post_date
        });
        res.status(200).json(postData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Update a post
router.put('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.update(req.body, {
            where: {
                id: req.params.id,
                user_id: req.session.user_id // make sure only the owner can update the post
            }
        });
        if (postData > 0) {
            res.status(200).json(postData);
        } else {
            res.status(404).json({ message: 'Post not found with this id or you are not the owner' });
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// Load the edit post view
router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id);

        if (!postData) {
            res.status(404).send('Post not found');
            return;
        }

        const post = postData.get({ plain: true });
        res.render('edit-post', { post });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Delete a post
router.delete('/:id', async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: { id: req.params.id }
        });
        if (!postData) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
