const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  postId: { type: String, required: true },
  value: { type: Number, required: true }
});

module.exports = mongoose.model('Rating', ratingSchema);
