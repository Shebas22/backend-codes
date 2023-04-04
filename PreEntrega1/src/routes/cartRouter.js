import { Router } from "express";
import ProductManager from "../controllers/ProductManager";
import CartManager from "../controllers/ProductManager";

const cartRouter = Router();
const cartManager = new CartManager();
const productManager = new ProductManager("./products.json");

cartRouter.get('/:cid', async (req, res) => {
    const cId = +req.params.cid;
    const cart = await cartManager.getById(cId)
    if (!cart) {
        return res
            .status(200)
            .send({ status: "Error", messagge: "Cart not found." });
    }
    return res
        .status(200)
        .send(cart);
})


cartRouter.post('/', async (req, res) => {
    const cId = req.params.cid;
    const pId = req.params.pid;
    const product = await productManager.getById(pId);
    if (product) {
        const addProductToCart = cartManager.addProductToCart(cId, product.id);
        if (addProductToCart) {
            return res
                .status(201)
                .send({ status: "Success", added: product });
        }
        return res
            .status(200)
            .send({ status: "Error", messagge: "Product not added." });
    }
    return res
        .status(200)
        .send({ status: 'Error', message: 'Product not found' })
})

cartRouter.post('/:cid/product/:pid', async (req, res) => {
    const cId = req.params.cid;
    const pId = req.params.pid;
    const product = await productManager.getById(pId);
    if (product) {
        const addProductToCart = cartManager.addProductToCart(cId, product.id);
        if (addProductToCart) {
            return res
                .status(201)
                .send({ status: "Success", added: product });
        }
        return res
            .status(200)
            .send({ status: "Error", messagge: "Product not added." });
    }
    return res
        .status(200)
        .send({ status: 'Error', message: 'Product not found' })
})

// const cart = req.body;
// carts.push(cart);
// res.status(201).json(cart);

export default cartRouter;