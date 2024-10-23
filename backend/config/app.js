/*
const express = require('express');
const routerEmployed = require('../api/api-employed/routes/employedRoutes');
const routerLots = require('../api/api-lots/routes/lotsRoutes');
const routerActivities = require('../api/api-activites/router/activityRoutes');
const { errorHandling } = require('../middleware/errorHandling');
const authRouter = require('../api/api-users/router/authRoutes');
const usersRouter = require('../api/api-users/router/usersRoutes');
const subActivityRouter = require('../api/api-sub_activities/routes/subActivityRoute');
const employeActivityRouter = require('../api/api-employees-activities/routes/employeActivityRouter');
const cors = require('cors');
const cookies = require('cookie-parser');
class App {
  #app;
  #_PORT;
  constructor(_PORT) {
    this.#app = express();
    this.#_PORT = _PORT;
  }
  #settings() {
    this.#app.use(express.json());
    this.#app.use(
      cors({
        origin: 'http://localhost:3000', // El dominio del frontend
        credentials: true, // Permitir el envío de cookies
      })
    );
    this.#app.use(cookies());
    this.#app.use(express.urlencoded({ extended: true }));
  }
  #middleware() {
    this.#app.use(errorHandling);
  }
  #setRoutes() {
    this.#app.use('/api/employed', routerEmployed);
    this.#app.use('/api/lots', routerLots);
    this.#app.use('/api/activities', routerActivities);
    this.#app.use('/api/auth', authRouter);
    this.#app.use('/api/users', usersRouter);
    this.#app.use('/api/sub-activities', subActivityRouter);
    this.#app.use('/api/employees-activities', employeActivityRouter);
  }
  async init() {
    this.#settings();
    this.#setRoutes();
    this.#middleware();
    this.#app.listen(this.#_PORT, async () => {
      console.log(`The server is running in http://localhost:${this.#_PORT}`);
    });
  }
}
module.exports = App;
*/
const express = require('express');
const routerEmployed = require('../api/api-employed/routes/employedRoutes');
const routerLots = require('../api/api-lots/routes/lotsRoutes');
const routerActivities = require('../api/api-activites/router/activityRoutes');
const { errorHandling } = require('../middleware/errorHandling');
const authRouter = require('../api/api-users/router/authRoutes');
const usersRouter = require('../api/api-users/router/usersRoutes');
const subActivityRouter = require('../api/api-sub_activities/routes/subActivityRoute');
const employeActivityRouter = require('../api/api-employees-activities/routes/employeActivityRouter');
const cors = require('cors');
const cookies = require('cookie-parser');
const http = require("http");
const WebSocket = require("ws");

class App {
  #app;
  #_PORT;
  #server;
  #wss;

  constructor(_PORT) {
    this.#app = express();
    this.#_PORT = _PORT;
    this.#server = http.createServer(this.#app);
    this.#wss = new WebSocket.Server({ server: this.#server }); // Crea el servidor WebSocket
  }

  #settings() {
    this.#app.use(express.json());
    this.#app.use(
      cors({
        origin: 'http://localhost:3000', // El dominio del frontend
        credentials: true, // Permitir el envío de cookies
      })
    );
    this.#app.use(cookies());
    this.#app.use(express.urlencoded({ extended: true }));
  }

  #middleware() {
    this.#app.use(errorHandling);
  }

  #setRoutes() {
    this.#app.use('/api/employed', routerEmployed);
    this.#app.use('/api/lots', routerLots);
    this.#app.use('/api/activities', routerActivities);
    this.#app.use('/api/auth', authRouter);
    this.#app.use('/api/users', usersRouter);
    this.#app.use('/api/sub-activities', subActivityRouter);
    this.#app.use('/api/employees-activities', employeActivityRouter);
  }

  #websocketSetup() {
    this.#wss.on('connection', (ws) => {
      console.log('Nuevo cliente conectado');

      // Manejar mensajes recibidos del cliente
      ws.on('message', (message) => {
        console.log('Mensaje recibido:', message);
        // Aquí puedes procesar el mensaje y enviar una respuesta
        // ws.send('Mensaje recibido: ' + message);
      });

      // Opcional: enviar un mensaje al cliente cuando se conecta
      ws.send('Conexión establecida con el servidor WebSocket');

      // Manejar el cierre de conexión
      ws.on('close', () => {
        console.log('Cliente desconectado');
      });
    });
  }

  async init() {
    this.#settings();
    this.#setRoutes();
    this.#middleware();
    this.#websocketSetup(); // Configura el WebSocket
    this.#server.listen(this.#_PORT, async () => {
      console.log(`The server is running in http://localhost:${this.#_PORT}`);
    });
  }
}

module.exports = App;
