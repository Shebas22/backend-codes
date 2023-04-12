import { Router } from "express";
import ProductManager from "../controllers/ProductManager.js";
import CartManager from "../controllers/CartManager.js";

const cartRouter = Router();
const cartManager = new CartManager();
const productManager = new ProductManager();

// Métodos gets del Router
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

cartRouter.get('/', async (req, res) => {
    return res
        .status(200)
        .send({ status: 'Success', carts: cartManager.get() })
})

// Métodos post del Router
cartRouter.post('/', async (req, res) => {
    const products = req.body;
    const createCart = await cartManager.create(products || [])
    if (createCart) {
        return res
            .status(201)
            .send({ status: 'Success', created: createCart })
    }
    return res
        .status(200)
        .send({ status: 'Error', message: 'Cart not created' })

});

cartRouter.post('/:cid/product/:pid', async (req, res) => {
    const cId = req.params.cid;
    const pId = req.params.pid;
    const productSearch = await productManager.getById(pId);
    if (productSearch) {
        const product = { product: { id: productSearch.id }, quantity: 1 }
        const productAdd = await cartManager.addProductToCart(cId, product);
        if (productAdd) {
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

// Métodos delete del Router
cartRouter.delete('/:cid', async (req, res) => {
    const cId = req.params.cid;
    const cartDelete = await cartManager.delete(cId)
    if(cartDelete){
        return res
            .status(200)
            .send({ status: 'Success', deleted: cartDelete })
    }
    return res
        .status(200)
        .send({ status: 'Error', messagge: 'Cart not deleted' })
})

export default cartRouter;