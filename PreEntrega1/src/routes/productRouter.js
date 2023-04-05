import { Router } from "express";
import ProductManager from "../controllers/ProductManager.js";

const productRouter = Router();
const productManager = new ProductManager();

// Métodos gets del Router
productRouter.get('/', async (req, res) => {
    const limit = req.query.limit ?? false;
    const products = await productManager.get()
    if (limit && products.length) {
        const result = []
        for (let index = 0; (index < limit) && products[index]; index++) {
            result.push(products[index])
        }
        console.log();
        return res
            .status(200)
            .send(result)
    }
    return res
        .status(200)
        .send(products)
});

productRouter.get('/:pid', async (req, res) => {
    const pId = +req.params.pid;
    const product = await productManager.getById(pId)
    if (!product) {
        return res
            .status(200)
            .send({ status: "Error", messagge: "Product not found." });
    }
    return res
        .status(200)
        .send(product);
});

// Método post del Router
productRouter.post('/', async (req, res) => {
    const product = req.body;
    if (Object.keys(product).length !== 0) {
        const addProduct = await productManager.add(product)
        if (addProduct) {
            return res
                .status(201)
                .send({ status: 'Success', created: addProduct })
        }
        return res
            .status(200)
            .send({ status: 'Error', message: 'Product not added' })
    }
    return res
        .status(200)
        .send({ status: 'Error', message: 'A product was expected' })
});

// Método put del Router
productRouter.put('/:pid', async (req, res) => {
    const pId = +req.params.pid;
    const product = req.body;
    if (Object.keys(product).length !== 0) {
        const updateProduct = await productManager.update(product, pId)
        if (updateProduct) {
            return res
                .status(200)
                .send({ status: "Success", before: updateProduct, after: product });
        }
        return res
            .status(200)
            .send({ status: 'Error', message: 'Product not updated' });
    }
    return res
        .status(200)
        .send({ status: 'Error', message: 'A product was expected' })
});

// Método delete del Router
productRouter.delete('/:pid', async (req, res) => {
    const pId = +req.params.pid;
    const deleteProduct = await productManager.delete(pId)
    if (deleteProduct) {
        return res
            .status(200)
            .send({ status: "Success", removed: deleteProduct });
    }
    return res
        .status(200)
        .send({ status: 'Error', messagge: 'No product has been deleted' });
});

export default productRouter;