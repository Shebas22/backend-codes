import ProductManager from "../../domain/managers/productManager.js";
import idValidation from "../../domain/validations/shared/idValidation.js";

const manager = new ProductManager();

export const list = async (req, res, next) => {
    try {
        const products = await manager.paginate(req)
        return res.status(200).send({ status: 'success', payload: products.docs, ...products, docs: undefined })
    } catch (error) {
        next(error)
    }
};

export const getOne = async (req, res, next) => {
    try {
        await idValidation.parseAsync(req.params);
        const { id } = req.params;
        const product = await manager.getOne(id);
        return res.status(200).send({ status: 'success', product });
    } catch (error) {
        next(error)
    }
};

export const save = async (req, res, next) => {
    try {
        const product = req.body;
        const addProduct = await manager.create(product)
        return res.status(201).send({ status: 'success', addProduct, message: 'Product created.' })
    } catch (error) {
        next(error)
    }
};

export const update = async (req, res, next) => {
    try {
        const product = req.body;
        await idValidation.parseAsync(req.params);
        const { id } = req.params;
        const updateProduct = await manager.updateOne(id, product)
        return res.status(200).send({ status: 'success', updateProduct, message: 'Product updated.' });
    } catch (error) {
        next(error)
    }
};

export const deleteOne = async (req, res, next) => {
    try {
        await idValidation.parseAsync(req.params);
        const { id } = req.params;
        const resul = await manager.deleteOne(id);
        return res.status(200).send({ status: 'success', message: 'Product deleted.' });
    } catch (error) {
        next(error)
    }
};

