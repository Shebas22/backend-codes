import cartManager from "../managers/cartManager.js";

export const list = async (req, res) => {
  const manager = new cartManager();
  const carts = await manager.find();

  return res
    .status(200)
    .send({ status: 'success', carts })
};

export const getOne = async (req, res) => {
  const { id } = req.params;
  const manager = new cartManager();
  const cart = await manager.getOne(id);

  if (!cart) {
    return res
      .status(200)
      .send({ status: "Error", messagge: "Cart not found." });
  }
  return res
    .status(200)
    .send({ status: 'success', cart });

};

export const save = async (req, res) => {
  const manager = new cartManager();
  const cart = await manager.create(req.body);

  if (cart) {
    return res
      .status(201)
      .send({ status: 'success', cart, message: 'Cart created.' })
  }
  return res
    .status(200)
    .send({ status: 'Error', message: 'Cart not created' })

};

export const update = async (req, res) => {
  const { id } = req.params;
  const manager = new cartManager();
  const cart = await manager.updateOne(id, req.body);

  if (cart) {
    return res
      .status(201)
      .send({ status: 'success', cart, message: 'Cart updated.' });
  }
  return res
    .status(200)
    .send({ status: "Error", messagge: "Cart not updated." });
};

export const deleteOne = async (req, res) => {
  const { id } = req.params;
  const manager = new cartManager();
  const cart = await manager.deleteOne(id);

  if (cart) {
    return res
      .status(200)
      .send({ status: 'success', message: 'Cart deleted.' })
  }
  return res
    .status(200)
    .send({ status: 'Error', messagge: 'Cart not deleted' })

};

export const addProduct = async (req, res) => {
  const { cid, pid } = req.params;
  const manager = new cartManager();
  const cart = await manager.addProduct(cid, pid);
  if (cart) {
    return res
      .status(201)
      .send({ status: 'success', cart, message: 'Cart updated.' });
  }
  return res
    .status(200)
    .send({ status: "Error", messagge: "Cart not updated." });

};

export const updateProduct = async (req, res) => {
  const { cid, pid } = req.params;
  const quantity = +req.body.quantity;
  const manager = new cartManager();
  const cart = await manager.updateProduct(cid, pid, quantity);
  if (cart) {
    return res
      .status(201)
      .send({ status: 'success', cart, message: 'Cart updated.' });
  }
  return res
    .status(200)
    .send({ status: "Error", messagge: "Cart not updated." });

};

export const deleteProduct = async (req, res) => {
  const { cid, pid } = req.params;
  const manager = new cartManager();
  const cart = await manager.deleteProduct(cid, pid);
  if (cart) {
    return res
      .status(201)
      .send({ status: 'success', cart, message: 'Product deleted.' });
  }
  return res
    .status(200)
    .send({ status: "Error", messagge: "Product not deleted." });

};





