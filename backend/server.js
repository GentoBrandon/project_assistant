const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const router = require('./routes/employedRoutes');

app.use(express.json());
app.use(cors());

app.use('/api', router);

app.listen(port, async () => {
console.log(`Form Register API listening on port ${port}`);
});