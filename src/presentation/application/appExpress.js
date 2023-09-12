import express from 'express';
import cookieParser from "cookie-parser";
import swaggerUiExpress from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { SwaggerTheme } from 'swagger-themes';
import compression from "express-compression";
import { resolve } from 'path';
import { addLogger } from '../../shared/logger.js';
import { engine } from 'express-handlebars';

import sessionRouter from "../routes/sessionRouter.js";
import userRouter from "../routes/userRouter.js";
import cartRouter from '../routes/cartRouter.js';
import productRouter from '../routes/productRouter.js';
import roleRouter from '../routes/roleRouter.js';

import errorHandler from "../middlewares/errorHandler.js";

class AppExpress {

    constructor() {
        this.theme = new SwaggerTheme('v3');
        this.docsPath = resolve('./docs');
        this.swaggerOptions = {
            definition: {
                openapi: '3.0.1',
                info: {
                    title: "Ecommerce API",
                    description: "Proyecto Final Coder - API de ECommerce"
                }
            },
            apis: [`${this.docsPath}/**/*.yaml`]
        }
        this.specs = swaggerJsdoc(this.swaggerOptions)
        this.viewsPath = resolve('src/presentation/views');
    }

    init() {
        this.server = express();
        this.server.use(express.json());
        this.server.use(express.urlencoded({ extended: true }));
        this.server.use(cookieParser());
        this.server.use(compression({
            brotli: {
                enabled: true,
                zlib: {}
            },
        }));
        this.server.use(addLogger)
    }

    build() {
        const optionsTheme = {
            explorer: true,
            customCss: this.theme.getBuffer('dark')
        };
        this.server.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(this.specs, optionsTheme))
        this.server.use('/api/products', productRouter);
        this.server.use('/api/carts', cartRouter);
        this.server.use('/api/sessions', sessionRouter);
        this.server.use('/api/users', userRouter);
        this.server.use('/api/roles', roleRouter);
        
        this.server.engine('handlebars', engine({
            layoutsDir: `${this.viewsPath}`,
            defaultLayout: `${this.viewsPath}/layouts/main.hbs`,
        }));
        this.server.set('view engine', 'handlebars');
        this.server.set('views', this.viewsPath);

        this.server.all('*', (req, res) => {
            throw new Error('Path not found');
        });
        this.server.use(errorHandler);
    }

    listen() {
        return this.server.listen(process.env.NODE_PORT, () => {
            console.log(`Server listening on port ${process.env.NODE_PORT}`);
        });
    }

    callback() {
        return this.server;
    }

    close() {
        this.server.close();
    }
}

export default AppExpress;