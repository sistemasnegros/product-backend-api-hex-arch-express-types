import express from 'express';
import { Request, Response } from 'express';
import favicon from 'serve-favicon';
import path from 'path';
// import cors from '../controllers/http/middlewares/cors';
import cors from 'cors';

import ProductController from '../controllers/http/ProductController';
import UserController from '../controllers/http/UserController';
import API_URL from '../const/url';

const app = express();

app.use(express.json());
app.use(cors());
app.use(favicon(path.join(__dirname, '../../public', 'favicon.ico')));
app.use(express.static('public'));

app.options('*', cors);

app.get('/', (req: Request, res: Response) => {
  res.send('API works!');
});

app.use(API_URL.PRODUCT, ProductController);
app.use(API_URL.USER, UserController);

const server = app.listen(3001, () => {
  console.log('Application started on port 3001!');
});

export { app, server };
