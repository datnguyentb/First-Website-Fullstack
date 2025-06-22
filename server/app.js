import express from 'express';
import routes from './routes/index.routes.js';
import morgan from 'morgan';

const app = express();

app.use(express.json());
app.use(morgan('dev')); // middleware log
app.use('/', routes);

export default app;
