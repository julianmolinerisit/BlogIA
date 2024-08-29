const sanitizeHtml = require('sanitize-html');
const Post = require('../models/Post');
const upload = require('../config/cloudinaryConfig');
const cloudinary = require('cloudinary').v2;


exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    // Crear un nuevo post con el contenido que incluye las imágenes embebidas
    const post = new Post({
      title,
      content,
      author: req.user._id,  // Asume que el usuario autenticado se adjunta al request
    });

    await post.save();

    res.status(201).json({ message: 'Post creado con éxito', post });
  } catch (error) {
    console.error('Error al crear el post:', error);
    res.status(500).json({ message: 'Hubo un error al crear el post' });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'username');
    res.json(posts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'username');
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controlador para subir imágenes
const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No se ha proporcionado ninguna imagen.' });
    }
    // La URL de la imagen se obtiene de Cloudinary después de la subida
    const imageUrl = req.file.path;
    res.status(200).json({ url: imageUrl });
  } catch (error) {
    res.status(500).json({ message: 'Error al subir la imagen.', error });
  }
};

exports.uploadImage = uploadImage;  // Añadir esta línea para exportar la función
