const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes/routes');

app.use(express.json());
app.use(cors());

// Usar las rutas de tareas
app.use('/api');

module.exports = app;