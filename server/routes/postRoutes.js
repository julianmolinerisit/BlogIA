const express = require('express');
const {
  createPost,
  getPosts,
  getPostById,
  deletePost,
  uploadImage,
  createDailyPost,
  updatePost,
  addComment,
  getTopRatedPosts
} = require('../controllers/postController');
const auth = require('../middleware/auth');
const router = express.Router();
const upload = require('../config/cloudinaryConfig');

router.post('/', auth, upload.single('image'), createPost);
router.get('/', getPosts);
router.delete('/:id', auth, deletePost);
router.get('/:id', getPostById);
router.post('/upload-image', auth, upload.single('image'), uploadImage);
router.post('/daily-post', auth, createDailyPost);
router.post('/:postId/comments', addComment);
router.put('/:postId', updatePost);
router.get('/top-rated', getTopRatedPosts); // Verifica esta línea

module.exports = router;
