// Imports
import express from 'express';
import ProductManager from "./ProductManager.js";

// Inicializando el servidor y manager
const server = express();
const productManager = new ProductManager("../products.json");

server.use(express.urlencoded({ extended: true }));

// Métodos gets del servidor
server.get('/products', async (req, res) => {
    const limit = req.query.limit?? false;
    const products = await productManager.getProducts()
    if (limit) {
        const result = []
        for (let index = 0; (index < limit) && products[index]; index++) {
            result.push(products[index])
        }
        res.send(result)
        return
    }
    res.send(products)
});

server.get('/products/:pid', async (req, res) => {
    const pId = +req.params.pid;
    const product = await productManager.getProductById(pId)
    if (!product) {
        res.send({ error: "Product not found." });
    }
    res.send(product);
});

// Iniciando el listener
server.listen(8083, () => {
    console.log('Server listening on port 8083');
});
