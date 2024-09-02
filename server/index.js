const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const commentRoutes = require('./routes/commentRoutes'); // Importar rutas de comentarios
const ratingRoutes = require('./routes/ratingRoutes'); // Importar rutas de ratings


require('dotenv').config();

// Importa el archivo cronJobs.js
require('./cronJobs');

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' })); // Increase payload size limit
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

mongoose.connect('mongodb://localhost:27017/blog', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);  // Exit the process if unable to connect to MongoDB
  });

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/comments', commentRoutes); // Agregar ruta para comentarios
app.use('/api/ratings', ratingRoutes); // Agregar ruta para valoraciones (ratings)


app.listen(5000, () => console.log('Server running on port 5000'));
