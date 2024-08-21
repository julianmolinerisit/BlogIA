const mongoose = require('mongoose');
const User = require('./models/User'); // Ajusta la ruta si es necesario
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

// Cargar variables de entorno desde el archivo .env
dotenv.config();

// Conectar a la base de datos
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado a la base de datos'))
    .catch(err => console.error('Error al conectar a la base de datos', err));

async function createDevUser() {
    const email = process.env.DEV_EMAIL;
    const password = process.env.DEV_PASSWORD;

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        console.log('Usuario de desarrollo ya existe.');
        mongoose.connection.close();
        return;
    }

    // Crear y guardar el nuevo usuario
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
        username: 'devuser',
        email,
        password: hashedPassword,
    });

    await newUser.save();
    console.log('Usuario de desarrollo creado.');

    // Cerrar la conexión a la base de datos
    mongoose.connection.close();
}

createDevUser();
