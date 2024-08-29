const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
require('dotenv').config();

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

app.listen(5000, () => console.log('Server running on port 5000'));
