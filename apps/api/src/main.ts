import express from 'express';
import {  } from '@org/models';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3333;

const app = express();
// const productsService = new ProductsService();

// Middleware
app.use(express.json());

// CORS configuration for React app
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.get('/', (req, res) => {
  res.send({ message: 'Hello API' });
});

// Products endpoints
app.get('/api/products', (req, res) => {
 res.send([])
});

app.get('/api/products/categories', (req, res) => {
  res.send([])
});

app.get('/api/products/:id', (req, res) => {
  res.send({})
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
