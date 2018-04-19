import express from 'express';
import bodyParser from 'body-parser';

const appRoutes = require('./controllers');

require('./config/config');

require('./db/mongoose');

const app: express.Application = express();

const port: string | number = process.env.PORT || 3000;

app.use(bodyParser.json());

appRoutes(app);

app.listen(port, () => console.log(`Listening on port: ${port}`));

export default app;



