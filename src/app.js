import express from 'express';
import loggerMiddleware from './middlewares/loggerMiddleware.js';
import errorHandler from './middlewares/errorHandler.js';
import routes from './routes/index.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(loggerMiddleware);

app.get('/', (req, res) => {
  res.send('Expenses tracker API');
});

app.use('/api', routes);

app.use(errorHandler);

export default app;