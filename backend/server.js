const app = require('./app');
const knex = require('./models/db');
const port = 3000;

app.listen(port, async () => {
await createTables();
console.log(`Form Register API listening on port ${port}`);
});