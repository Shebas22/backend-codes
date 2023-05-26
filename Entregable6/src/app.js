// Imports
import express from 'express';
import mongoose from "mongoose";
import session from "express-session";
import mongoStore from "connect-mongo";
import cookieParser from "cookie-parser";

import sessionRouter from "./routes/sessionRouter.js";
import userRouter from "./routes/userRouter.js";
import cartRouter from './routes/cartRouter.js';
import productRouter from './routes/productRouter.js';

import initializePassport from "./config/passport.config.js";
import passport from "passport";
import { engine } from 'express-handlebars';
import { resolve } from 'path';


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
    server.use(session({
      store: mongoStore.create({
        mongoUrl: process.env.MONGO_DB_URI,
        ttl: 60
      }),
      secret: 'sH3b4sS3cR3tC0D3',
      resave: false,
      saveUninitialized: false
    }));

    const viewsPath = resolve('src/views');
    server.engine('handlebars', engine({
      layoutsDir: `${viewsPath}/layouts`,
      defaultLayout: `${viewsPath}/layouts/main.handlebars`,
    }));
    server.set('view engine', 'handlebars');
    server.set('views', viewsPath);
    
    server.get('/', (req, res)=> {
      res.render('home');
    });
    
    server.get('/login', (req, res)=>{
      res.render('login');
    });
    
        initializePassport();
        server.use(passport.initialize());
        server.use(passport.session());

    server.use('/api/products', productRouter);
    server.use('/api/carts', cartRouter);
    server.use('/api/sessions', sessionRouter);
    server.use('/api/users', userRouter);
    server.use(errorHandler);

    // Iniciando el listener
    server.listen(8080, () => {
        console.log('Server listening on port 8080');
    });
})();
