import CartManager from "../../domain/managers/cartManager.js";

const cartManager = new CartManager();

export const list = async (req, res, next) => {
  try {
    const carts = await cartManager.find();
    res.status(200).json({ status: "success", carts });
  } catch (error) {
    next(error);
  }
};

export const getOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cart = await cartManager.getOne(id);
    res.status(200).json({ status: "success", cart });
  } catch (error) {
    next(error);
  }
};

export const save = async (req, res, next) => {
  try {
    const cart = await cartManager.create(req.body);
    res.status(201).json({ status: "success", cart, message: "Cart created." });
  } catch (error) {
    next(error)
  }
};

export const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cart = await cartManager.updateOne(id, req.body);
    res.status(201).json({ status: "success", cart, message: "Cart updated." });
  } catch (error) {
    next(error)
  }
};

export const deleteAllProducts = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cart = await cartManager.deleteAllProducts(id);
    res.status(200).json({ status: "success", cart, message: "Products removed from cart." });
  } catch (error) {
    next(error)
  }
};

export const addProduct = async (req, res, next) => {
  try {
    const { cid, pid } = req.params;
    const cart = await cartManager.addProduct(cid, pid);
    res.status(201).json({ status: "success", cart, message: "Cart updated." });
  } catch (error) {
    next(error)
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { cid, pid } = req.params;
    const quantity = +req.body.quantity;
    const cart = await cartManager.updateProduct(cid, pid, quantity);
    res.status(201).json({ status: "success", cart, message: "Cart updated." });
  } catch (error) {
    next(error)
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { cid, pid } = req.params;
    const cart = await cartManager.deleteProduct(cid, pid);
    res.status(201).json({ status: "success", cart, message: "Product deleted." });
  } catch (error) {
    next(error)
  }
};
