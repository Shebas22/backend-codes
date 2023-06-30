// Imports
import express from 'express';
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import sessionRouter from "./routes/sessionRouter.js";
import userRouter from "./routes/userRouter.js";
import cartRouter from './routes/cartRouter.js';
import productRouter from './routes/productRouter.js';
import roleRouter from './routes/roleRouter.js';

import errorHandler from './middlewares/errorHandler.js';

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
    server.use(cookieParser());

    server.use('/api/products', productRouter);
    server.use('/api/carts', cartRouter);
    server.use('/api/sessions', sessionRouter);
    server.use('/api/users', userRouter);
    server.use('/api/roles', roleRouter);

    server.use(errorHandler);

    // Iniciando el listener
    server.listen(8080, () => {
        console.log('Server listening on port 8080');
    });
})();
