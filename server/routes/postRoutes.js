const express = require('express');
const router = express.Router();
const Post = require('../models/Post'); // Asegúrate de que la ruta al modelo sea correcta

// Crear un nuevo post
router.post('/', async (req, res) => {
  try {
    const newPost = new Post(req.body);
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear el post', error });
  }
});

// Obtener todos los posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ message: 'Error al obtener los posts', error });
  }
});

module.exports = router;
