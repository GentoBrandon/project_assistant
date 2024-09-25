const express = require('express');
const routerEmployed = require('./routes/employedRoutes');
const { errorHandling } = require('./middleware/errorHandling');
class App {
  #app;
  #_PORT;
  constructor(_PORT) {
    this.#app = express();
    this.#_PORT = _PORT;
  }
  #settings() {
    this.#app.use(express.json());
  }
  #middleware() {
    this.#app.use(errorHandling);
  }
  #setRoutes() {
    this.#app.use('/api/employed', routerEmployed);
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
