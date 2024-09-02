const sanitizeHtml = require('sanitize-html');
const Post = require('../models/Post');
const upload = require('../config/cloudinaryConfig');
const cloudinary = require('cloudinary').v2;
const Rating = require('../models/Rating');
const { generatePostContent } = require('../services/contentGenerator');

// Crear un nuevo post
exports.createPost = async (req, res) => {
  try {
    const { title, content, category } = req.body;

    const post = new Post({
      title,
      content,
      category,
      author: req.user._id,
    });

    await post.save();

    res.status(201).json({ message: 'Post creado con éxito', post });
  } catch (error) {
    console.error('Error al crear el post:', error);
    res.status(500).json({ message: 'Hubo un error al crear el post' });
  }
};

// Crear un post diario
exports.createDailyPost = async (req, res) => {
  try {
    const title = "Título del post generado automáticamente";
    const content = await generatePostContent(title);

    const post = new Post({
      title,
      content,
      author: req.user._id,
      publishedAt: new Date(),
    });

    await post.save();

    res.status(201).json({ message: 'Post creado con éxito', post });
  } catch (error) {
    console.error('Error creando el post diario:', error);
    res.status(500).json({ message: 'Hubo un error al crear el post diario' });
  }
};

// Obtener posts con opción de filtro por categoría y ordenación
// Obtener posts con opción de filtro por categoría y ordenación
exports.getPosts = async (req, res) => {
  try {
    const { category, sortBy } = req.query;
    let query = {};
    let sortCriteria = { createdAt: -1 }; // Default sorting by date

    if (category) {
      query.category = category; // Make sure category is correctly passed
    }

    if (sortBy === 'rating') {
      sortCriteria = { averageRating: -1 };
    } else if (sortBy === 'date') {
      sortCriteria = { createdAt: -1 };
    }

    console.log('Query:', query); // Debugging line to check the query
    console.log('Sort Criteria:', sortCriteria); // Debugging line to check sort criteria

    const posts = await Post.aggregate([
      {
        $lookup: {
          from: 'ratings',
          localField: '_id',
          foreignField: 'postId',
          as: 'ratings'
        }
      },
      {
        $addFields: {
          averageRating: {
            $cond: {
              if: { $gt: [{ $size: '$ratings' }, 0] },
              then: { $avg: '$ratings.value' },
              else: null
            }
          }
        }
      },
      {
        $match: query
      },
      {
        $sort: sortCriteria
      }
    ]);

    res.json(posts);
  } catch (error) {
    console.error('Error en getPosts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Obtener un post por ID
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

// Eliminar un post
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

// Subir imágenes
const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No se ha proporcionado ninguna imagen.' });
    }
    const imageUrl = req.file.path;
    res.status(200).json({ url: imageUrl });
  } catch (error) {
    res.status(500).json({ message: 'Error al subir la imagen.', error });
  }
};

exports.uploadImage = uploadImage;

// Agregar un comentario
exports.addComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { comment } = req.body;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post no encontrado' });
    }

    post.comments.push({ comment });
    await post.save();

    res.status(201).json(post.comments[post.comments.length - 1]);
  } catch (error) {
    res.status(500).json({ message: 'Error al agregar el comentario', error });
  }
};

// Actualizar un post
exports.updatePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { title, content, category } = req.body;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post no encontrado' });
    }

    post.title = title;
    post.content = content;
    post.category = category;

    await post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el post', error });
  }
};


// Asegúrate de que el controlador esté correctamente definido y exportado
exports.getTopRatedPosts = async (req, res) => {
  try {
    const posts = await Post.aggregate([
      {
        $lookup: {
          from: 'ratings',
          localField: '_id',
          foreignField: 'postId',
          as: 'ratings'
        }
      },
      {
        $addFields: {
          averageRating: {
            $cond: {
              if: { $gt: [{ $size: '$ratings' }, 0] },
              then: { $avg: '$ratings.value' },
              else: null
            }
          }
        }
      },
      {
        $match: {
          averageRating: { $ne: null }
        }
      },
      {
        $sort: {
          averageRating: -1
        }
      },
      {
        $limit: 10
      }
    ]);

    res.json(posts);
  } catch (error) {
    console.error('Error fetching top rated posts:', error);
    res.status(500).json({ message: 'Error fetching top rated posts' });
  }
};


