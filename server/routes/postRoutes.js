const express = require('express');
const { createPost, getPosts, getPostById, deletePost, uploadImage } = require('../controllers/postController');
const auth = require('../middleware/auth');
const router = express.Router();
const upload = require('../config/cloudinaryConfig');

router.post('/', auth, upload.single('image'), createPost);
router.get('/', getPosts);
router.delete('/:id', auth, deletePost);
router.get('/:id', getPostById);
// Nueva ruta para la subida de imágenes
router.post('/upload-image', auth, upload.single('image'), uploadImage);

module.exports = router;
