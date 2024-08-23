const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { email, firstName, lastName, username, password } = req.body;

    // Verificar si el correo electrónico o nombre de usuario ya están en uso
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Email or username already exists' });
    }

    const user = new User({ email, firstName, lastName, username, password });
    await user.save();
    res.status(201).json({ message: 'User created' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = user.generateAuthToken();
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener datos del usuario autenticado
exports.getUserData = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); // Excluye solo la contraseña
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    console.log('User data from DB:', user); // Asegúrate de que el usuario se está obteniendo correctamente
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
