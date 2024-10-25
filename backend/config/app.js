
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
