import CartManager from "../../domain/managers/cartManager.js";

const cartManager = new CartManager();

export const list = async (req, res, next) => {
  try {
    const carts = await cartManager.find();
    req.logger.info("List carts.");
    res.status(200).json({ status: "success", carts });
  } catch (error) {
    next(error);
  }
};

export const getOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cart = await cartManager.getOne(id);
    req.logger.info("Cart found.");
    res.status(200).json({ status: "success", cart });
  } catch (error) {
    next(error);
  }
};

export const save = async (req, res, next) => {
  try {
    const cart = await cartManager.create(req.body);
    req.logger.info("Cart created.");
    res.status(201).json({ status: "success", cart, message: "Cart created." });
  } catch (error) {
    next(error)
  }
};

export const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cart = await cartManager.updateOne(id, req.body);
    req.logger.info("Cart updated.");
    res.status(201).json({ status: "success", cart, message: "Cart updated." });
  } catch (error) {
    next(error)
  }
};

export const deleteAllProducts = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cart = await cartManager.deleteAllProducts(id);
    req.logger.info("Products removed from cart.");
    res.status(200).json({ status: "success", cart, message: "Products removed from cart." });
  } catch (error) {
    next(error)
  }
};

export const addProduct = async (req, res, next) => {
  try {
    const { cid, pid } = req.params;
    const cart = await cartManager.addProduct(cid, pid);
    req.logger.info("Cart updated.");
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
    req.logger.info("Cart updated.");
    res.status(201).json({ status: "success", cart, message: "Cart updated." });
  } catch (error) {
    next(error)
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { cid, pid } = req.params;
    const cart = await cartManager.deleteProduct(cid, pid);
    req.logger.info("Product deleted.");
    res.status(201).json({ status: "success", cart, message: "Product deleted." });
  } catch (error) {
    next(error)
  }
};

export const buy = async (req, res, next) => {
  try {
    // Logica de compra
    // const { cid } = req.params;
    // const cart = await cartManager.finalizePurchase(cid);
    req.logger.info("Completed purchase.");
    res.status(201).json({ status: "success", cart, message: "Completed purchase." });
  } catch (error) {
    next(error)
  }
};
