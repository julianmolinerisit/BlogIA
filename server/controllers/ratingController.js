const Rating = require('../models/Rating');

// Función para calcular el promedio
const calculateAverageRating = (ratings) => {
    if (ratings.length === 0) return 0;
    const total = ratings.reduce((acc, rating) => acc + rating.value, 0);
    return total / ratings.length;
  };
  

// Controlador para agregar una valoración
exports.addRating = async (req, res) => {
    try {
      const { postId, rating } = req.body;
      
      // Log para verificar los datos recibidos
      console.log('Received Rating Data:', { postId, rating });
  
      const newRating = new Rating({ postId, value: rating });
      await newRating.save();
      
      // Log para confirmar que la valoración se guardó correctamente
      console.log('New Rating Saved:', newRating);
  
      res.status(201).json({ message: 'Rating added successfully' });
    } catch (error) {
      console.error('Error adding rating:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  

// Controlador para obtener el promedio de valoraciones
exports.getAverageRating = async (req, res) => {
    try {
      const postId = req.params.postId;
      
      // Log para verificar el postId recibido
      console.log('Post ID for Average Rating:', postId);
  
      const ratings = await Rating.find({ postId });
      
      // Log para verificar los ratings obtenidos
      console.log('Ratings for Post:', ratings);
  
      const averageRating = calculateAverageRating(ratings);
      
      // Log para verificar el promedio de rating calculado
      console.log('Calculated Average Rating:', averageRating);
  
      res.json({ averageRating });
    } catch (error) {
      console.error('Error fetching ratings:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  