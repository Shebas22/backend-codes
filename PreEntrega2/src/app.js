// Imports
import express from 'express';
import mongoose from "mongoose";
import cartRouter from './routes/cartRouter.js';
import productRouter from './routes/productRouter.js';

import dotenv from "dotenv";
dotenv.config();

void (async () => {
    await mongoose.connect(process.env.MONGO_DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    // Inicializando el servidor y Router
    const server = express();

    server.use(express.json())
    server.use(express.urlencoded({ extended: true }));

    server.use('/api/products', productRouter);
    server.use('/api/carts', cartRouter);

    // Iniciando el listener
    server.listen(8080, () => {
        console.log('Server listening on port 8080');
    });
})();
