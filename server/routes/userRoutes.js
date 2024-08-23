const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { register, login, getUserData } = require('../controllers/userController'); // Importa getUserData

router.post('/register', register);
router.post('/login', login);
// Ruta protegida para obtener los datos del usuario autenticado
router.get('/me', auth, getUserData);

module.exports = router;
