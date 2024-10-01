const express = require('express');
const routerEmployed = require('../api-employed/routes/employedRoutes');
const routerLots = require('../api-lots/routes/lotsRoutes');
const routerActivities = require('../api-activites/router/activityRoutes');
const { errorHandling } = require('../middleware/errorHandling');
const authRouter = require('../api-users/router/authRoutes');
const usersRouter = require('../api-users/router/usersRoutes');
const cors = require('cors');
class App {
  #app;
  #_PORT;
  constructor(_PORT) {
    this.#app = express();
    this.#_PORT = _PORT;
  }
  #settings() {
    this.#app.use(express.json());
    this.#app.use(cors());
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
