import CartManager from "../managers/cartManager.js";

const cartManager = new CartManager();

export const list = async (req, res) => {
  const carts = await cartManager.find();
  res.status(200).json({ status: "success", carts });
};

export const getOne = async (req, res) => {
  const { id } = req.params;
  const cart = await cartManager.getOne(id);
  if (!cart) {
    return res
      .status(404)
      .json({ status: "error", message: "Cart not found." });
  }
  res.status(200).json({ status: "success", cart });
};

export const save = async (req, res) => {
  const cart = await cartManager.create(req.body);
  if (!cart) {
    return res
      .status(400)
      .json({ status: "error", message: "Cart not created" });
  }
  res.status(201).json({ status: "success", cart, message: "Cart created." });
};

export const update = async (req, res) => {
  const { id } = req.params;
  const cart = await cartManager.updateOne(id, req.body);
  if (!cart) {
    return res
      .status(404)
      .json({ status: "error", message: "Cart not updated." });
  }
  res.status(201).json({ status: "success", cart, message: "Cart updated." });
};

export const deleteAllProducts = async (req, res) => {
  const { id } = req.params;
  const cart = await cartManager.deleteAllProducts(id);
  if (!cart) {
    return res
      .status(404)
      .json({ status: "error", message: "Products not removed from cart" });
  }
  res
    .status(200)
    .json({ status: "success", cart, message: "Products removed from cart." });
};

export const addProduct = async (req, res) => {
  const { cid, pid } = req.params;
  const cart = await cartManager.addProduct(cid, pid);
  if (!cart) {
    return res
      .status(404)
      .json({ status: "error", message: "Cart not updated." });
  }
  res.status(201).json({ status: "success", cart, message: "Cart updated." });
};

export const updateProduct = async (req, res) => {
  const { cid, pid } = req.params;
  const quantity = +req.body.quantity;
  const cart = await cartManager.updateProduct(cid, pid, quantity);
  if (!cart) {
    return res
      .status(404)
      .json({ status: "error", message: "Cart not updated." });
  }
  res.status(201).json({ status: "success", cart, message: "Cart updated." });
};

export const deleteProduct = async (req, res) => {
  const { cid, pid } = req.params;
  const cart = await cartManager.deleteProduct(cid, pid);
  if (!cart) {
    return res
      .status(404)
      .json({ status: "error", message: "Product not deleted." });
  }
  res
    .status(201)
    .json({ status: "success", cart, message: "Product deleted." });
};
