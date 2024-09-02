// server/controllers/commentController.js
const Comment = require('../models/Comment');
const Post = require('../models/Post');

// Crear un comentario
exports.createComment = async (req, res) => {
    try {
      const { postId } = req.params;
      const { text } = req.body;
      const user = req.user; // Usuario autenticado
  
      if (!text) {
        return res.status(400).json({ error: 'Comment text is required' });
      }
  
      const newComment = new Comment({
        text,
        postId,
        author: user._id,
        username: user.username
      });
  
      await newComment.save();
  
      // Opcional: Actualizar la publicación con el nuevo comentario
      await Post.findByIdAndUpdate(postId, { $push: { comments: newComment._id } });
  
      res.status(201).json(newComment);
    } catch (error) {
      console.error('Error creating comment:', error); // Añadido para depuración
      res.status(500).json({ error: 'Error creating comment' });
    }
  };
  
// Obtener comentarios
exports.getComments = async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.find({ postId }).populate('author', 'username');
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching comments' });
  }
};
