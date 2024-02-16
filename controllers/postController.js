const router = require('express').Router();
const { Post } = require('../models');
const { User } = require('../models');

// Get all posts
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{ model: User, attributes: ['name'] }]
        });
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get a single post by id
router.get('/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [{ model: User, attributes: ['name'] }]
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

// Create a new post
router.post('/', async (req, res) => {
    try {
        const postData = await Post.create({
            // POST DATA
            user_id: req.session.user_id,
            title: req.body.title,
            content: req.body.content,
            post_image: req.body.post_image,
            post_url: req.body.post_url,
            post_date: req.body.post_date
        });
        res.status(200).json(postData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Update a post
router.put('/:id', async (req, res) => {
    try {
        const postData = await Post.update(
            // UPDATE DATA
            {
                title: req.body.title,
                content: req.body.content,
                post_image: req.body.post_image,
                post_url: req.body.post_url,
                post_date: req.body.post_date
            },
            { where: { id: req.params.id } }
        );
        if (!postData) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
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
