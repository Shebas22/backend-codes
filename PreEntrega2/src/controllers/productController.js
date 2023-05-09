import ProductManager from "../managers/productManager.js";

export const list = async (req, res) => {
    const manager = new ProductManager();
    const products = await manager.paginate(req)
    return res
        .status(200)
        .send({ status: 'success', payload: products.docs, ...products, docs: undefined })
};

export const getOne = async (req, res) => {
    const { id } = req.params;
    const manager = new ProductManager();
    const product = await manager.getOne(id);

    if (!product) {
        return res
            .status(200)
            .send({ status: "Error", messagge: "Product not found." });
    }
    return res
        .status(200)
        .send({ status: 'success', product });
};

export const save = async (req, res) => {
    const manager = new ProductManager();
    const product = req.body;

    if (Object.keys(product).length !== 0) {
        const addProduct = await manager.create(product)
        if (addProduct) {
            return res
                .status(201)
                .send({ status: 'success', addProduct, message: 'Product created.' })
        }
        return res
            .status(200)
            .send({ status: 'Error', message: 'Product not created' })
    }
    return res
        .status(200)
        .send({ status: 'Error', message: 'A product was expected' })
};

export const update = async (req, res) => {
    const { id } = req.params;
    const manager = new ProductManager();
    const product = req.body;

    if (Object.keys(product).length !== 0) {
        const updateProduct = await manager.updateOne(id, product)
        if (updateProduct) {
            return res
                .status(200)
                .send({ status: 'success', updateProduct, message: 'Product updated.' });
        }
        return res
            .status(200)
            .send({ status: 'Error', message: 'Product not updated' });
    }
    return res
        .status(200)
        .send({ status: 'Error', message: 'A product was expected' })
};

export const deleteOne = async (req, res) => {
    const { id } = req.params;
    const manager = new ProductManager();
    const product = await manager.deleteOne(id);

    if (product) {
        return res
            .status(200)
            .send({ status: 'success', message: 'Product deleted.' });
    }
    return res
        .status(200)
        .send({ status: 'Error', messagge: 'No product has been deleted' });
};

