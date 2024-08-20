const router = require('express').Router();
const Post = require('../models/Post');
const verifyToken = require('../middleware/verifyToken');

// Crear un post
router.post('/', verifyToken, async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Obtener todos los posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().populate('author', 'username');
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Obtener un post específico
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('author', 'username');
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Actualizar un post
router.put('/:id', verifyToken, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.author.toString() !== req.user.id) {
            return res.status(403).json("No tienes permiso para editar este post");
        }
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Eliminar un post
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.author.toString() !== req.user.id) {
            return res.status(403).json("No tienes permiso para eliminar este post");
        }
        await post.delete();
        res.status(200).json("Post eliminado");
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
