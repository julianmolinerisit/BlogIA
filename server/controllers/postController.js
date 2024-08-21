const Post = require('../models/Post');

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
};

exports.createPost = async (req, res) => {
  const { title, content } = req.body;

  try {
    const newPost = new Post({ title, content });
    const post = await newPost.save();
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: 'Publicación no encontrada' });
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
};
