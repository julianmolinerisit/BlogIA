const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: ''
  },
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category'
    }
  ],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Post', PostSchema);
