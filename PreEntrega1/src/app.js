// Imports
import express from 'express';

import ProductManager from "./controllers/ProductManager.js";

// import cartRouter from './routes/cartRouter.js';
import productRouter from './routes/productRouter.js';


// Inicializando el servidor y Router
const server = express();
// const productManager = new ProductManager("../../products.json");

server.use(express.json())
server.use(express.urlencoded({ extended: true }));
server.use('/api/products', productRouter);
// server.use('api/carts', cartRouter);

// Iniciando el listener
server.listen(8080, () => {
    console.log('Server listening on port 8080');
});
