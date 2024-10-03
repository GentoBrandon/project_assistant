const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');

const verifyToken = async (req, res, next) => {
  try {
    // Obtener el token desde el header 'x-access-token'
    const token = req.headers['x-access-token'];
    console.log('Token received: ', token); // <-- Debugging
    if (!token) {
      const error = new Error('No token provided');
      error.status = 403; // 403 Forbidden: No se proporcionó el token
      return next(error);
    }

    // Verificar el token de manera asíncrona
    const decoded = await jwt.verify(token, config.secret);

    // Guardar el ID del usuario en la solicitud
    req.id = decoded.id;
    req.user_name = decoded.user_name;
    req.role = decoded.role;
    console.log(req.id);
    console.log(req.user_name);
    console.log(req.role);
    // Continuar con el siguiente middleware o controlador
    next();
  } catch (error) {
    if (
      error.name === 'JsonWebTokenError' ||
      error.name === 'TokenExpiredError'
    ) {
      // Errores específicos de JWT
      error.status = 401; // 401 Unauthorized: Token inválido o expirado
      error.message = 'Unauthorized: Invalid or expired token';
    }
    next(error); // Pasar el error al middleware de manejo de errores
  }
};

module.exports = {
  verifyToken,
};
