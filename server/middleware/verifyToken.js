const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Obtener el token del encabezado Authorization
  const authHeader = req.header('Authorization');
  if (!authHeader) return res.status(401).json({ msg: 'No hay token, permiso no válido' });

  // El token está en el formato "Bearer <token>"
  const token = authHeader.split(' ')[1];

  // Verificar el token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Guardar la información del usuario en req.user
    next(); // Continuar con la solicitud
  } catch (err) {
    res.status(401).json({ msg: 'Token no válido' });
  }
};
