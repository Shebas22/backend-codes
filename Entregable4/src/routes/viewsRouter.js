import { Router } from "express";
import { resolve } from 'path';

import ProductManager from "../controllers/ProductManager.js";
import CartManager from "../controllers/CartManager.js";

const viewsRouter = Router();

const cartManager = new CartManager();
const productManager = new ProductManager();
const stylesPath = resolve('src/assets/css/styles.css');


viewsRouter.get('/', async function (req, res) {
    const data = await productManager.get()
    res.render('realTimeProducts', { products: data, styles: stylesPath })
});

export default viewsRouter;