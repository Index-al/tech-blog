const router = require('express').Router();
const { Comment } = require('../../models');
// Import other required models and middleware
const { Post, User } = require('../../models');
const withAuth = require('../../utils/auth');


// Create a new comment
router.post('/', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.create({
            // COMMENT DATA
            user_id: req.session.user_id,
            post_id: req.body.post_id,
            content: req.body.content,
            post_date: req.body.post_date
        });
        res.status(200).json(commentData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Update a comment
router.put('/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.update(
            // UPDATE DATA
            {
                content: req.body.content,
                post_date: req.body.post_date
            },
            {
                where: {
                    id: req.params.id
                }
            }
            );
            res.status(200).json(commentData);
        } catch (err) {
            res.status(400).json(err);
        }
    }
);

// Delete a comment
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id
            }
        });
        if (!commentData) {
            res.status(404).json({ message: 'No comment found with this id!' });
            return;
        }
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
