const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const authRoutes = require('./routes/auth');
const verifyToken = require('./middleware/verifyToken');

dotenv.config();

const app = express();

// Configuración de CORS
app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,POST,PUT,DELETE',
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Conectar a la base de datos
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Conectado a la base de datos');
        createDevUser();
    })
    .catch(err => console.error('Error al conectar a la base de datos', err));

// Crear un usuario de desarrollo si no existe
async function createDevUser() {
    const email = process.env.DEV_EMAIL;
    const password = process.env.DEV_PASSWORD;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log('Usuario de desarrollo ya existe.');
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username: 'devuser',
            email,
            password: hashedPassword,
        });

        await newUser.save();
        console.log('Usuario de desarrollo creado.');
    } catch (error) {
        console.error('Error al crear el usuario de desarrollo', error);
    }
}

// Importar y usar las rutas
app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/categories', categoryRoutes);
app.use('/auth', authRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
