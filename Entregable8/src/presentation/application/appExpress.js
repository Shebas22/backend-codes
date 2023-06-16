import express from 'express';
import cookieParser from "cookie-parser";

import sessionRouter from "../routes/sessionRouter.js";
import userRouter from "../routes/userRouter.js";
import cartRouter from '../routes/cartRouter.js';
import productRouter from '../routes/productRouter.js';
import roleRouter from '../routes/roleRouter.js';

import errorHandler from "../middlewares/errorHandler.js";

class AppExpress {
    init() {
        this.server = express();
        this.server.use(express.json());
        this.server.use(express.urlencoded({ extended: true }));
        this.server.use(cookieParser());
    }

    build() {
        this.server.use('/api/products', productRouter);
        this.server.use('/api/carts', cartRouter);
        this.server.use('/api/sessions', sessionRouter);
        this.server.use('/api/users', userRouter);
        this.server.use('/api/roles', roleRouter);
    
        this.server.use(errorHandler);
    }

    listen() {
        return this.server.listen(process.env.NODE_PORT, () => {
            console.log(`Server listening on port ${process.env.NODE_PORT}`);
        });
    }
}

export default AppExpress;