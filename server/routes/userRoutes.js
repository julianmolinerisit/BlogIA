const express = require('express');
const router = express.Router();
const { getPosts, createPost, getPostById } = require('../controllers/postController');

// Ruta para obtener todas las publicaciones
router.get('/', getPosts);

// Ruta para crear una nueva publicación
router.post('/', createPost);

// Ruta para obtener una publicación por ID
router.get('/:id', getPostById);

module.exports = router;
