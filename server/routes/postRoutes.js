const express = require('express');
const { createPost, getPosts, getPostById, deletePost } = require('../controllers/postController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, createPost);
router.get('/', getPosts);
router.delete('/:id', auth, deletePost); // Nueva ruta para eliminar un post
router.get('/:id', getPostById); // Nueva ruta para obtener un post por ID

module.exports = router;
