const express = require('express');
const router = express.Router();
const { getCategories } = require('../controllers/categoryController');

// Ruta para obtener todas las categorías
router.get('/', getCategories);

module.exports = router;
