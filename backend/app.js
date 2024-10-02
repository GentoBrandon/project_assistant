const express = require('express');
const routes = express.Router();



// Usar las rutas de tareas
routes.use('/api', routes);

module.exports = routes;