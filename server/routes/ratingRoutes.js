const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/RatingController');

router.post('/', ratingController.addRating); // POST para agregar rating
router.get('/:postId', ratingController.getAverageRating); // GET para obtener promedio de valoraciones

module.exports = router;
