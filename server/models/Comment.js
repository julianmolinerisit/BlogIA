const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    content: { type: String, required: true },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Comment', CommentSchema);
