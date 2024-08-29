const express = require('express');
const router = express.Router();
const upload = require('../config/cloudinaryConfig');

router.post('/upload-image', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No se proporcionó ninguna imagen' });
  }
  res.status(200).json({ url: req.file.path });
});

module.exports = router;
