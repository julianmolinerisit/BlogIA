// server/routes/comments.js
const express = require('express');
const router = express.Router();
const { createComment, getComments } = require('../controllers/commentController');
const authenticate = require('../middleware/auth');

// Crear un comentario
router.post('/:postId', authenticate, createComment);

// Obtener comentarios de un post
router.get('/:postId', getComments);

module.exports = router;


