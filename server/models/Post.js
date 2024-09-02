const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String },  // URL de la imagen en Cloudinary
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  comments: [{ comment: String, date: { type: Date, default: Date.now } }],
  publishedAt: { type: Date, default: Date.now },  // Fecha de publicación
});

module.exports = mongoose.model('Post', postSchema);
