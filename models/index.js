// Purpose: This file will import all of the models and create associations between them.

const User = require('./user');
const Post = require('./post');
const Comment = require('./comment');

// Create associations
User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Post.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id'
})

module.exports = { User, Post, Comment };