import ProductMongooseDao from "../daos/productMongooseDao.js";
import CartMongooseDao from "../daos/cartMongooseDao.js";

class CartManager {
  constructor() {
    this.productDao = new ProductMongooseDao();
    this.cartDao = new CartMongooseDao();
  }

  async find() {
    return this.cartDao.find();
  }

  async getOne(id) {
    return this.cartDao.getOne(id);
  }

  async create(data) {
    return await this.cartDao.create(data);
  }

  async updateOne(id, data) {
    return this.cartDao.updateOne(id, data);
  }

  async deleteAllProducts(id) {
    const cart = await this.cartDao.getOne(id);

    if (!cart || !cart.products.length) {
      return false;
    }

    const clearCart = {
      id: cart.id,
      status: cart.status,
      products: [],
    };

    return await this.cartDao.updateOne(id, clearCart);
  }

  async addProduct(cid, pid) {
    const cart = await this.cartDao.getOne(cid);
    const product = await this.productDao.getOne(pid);

    if (!cart || !cart.id || !product || !product.id) {
      return false;
    }

    const existingProduct = cart.products.find(
      (p) => p.id.toString() === pid.toString()
    );

    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      cart.products.push({ id: product.id, quantity: 1 });
    }

    return await this.cartDao.updateOne(cid, cart);
  }

  async deleteProduct(cid, pid) {
    const cart = await this.cartDao.getOne(cid);

    if (!cart || !cart.products.length) {
      return false;
    }

    const index = cart.products.findIndex(
      (product) => product.id.toString() === pid.toString()
    );

    if (index >= 0) {
      cart.products.splice(index, 1);
      return await this.cartDao.updateOne(cid, cart);
    } else {
      return false;
    }
  }

  async updateProduct(cid, pid, quantity) {
    const cart = await this.cartDao.getOne(cid);

    if (!cart || !cart.products.length) {
      return false;
    }

    const product = cart.products.find(
      (product) => product.id.toString() === pid.toString()
    );

    if (!product) {
      return false;
    }

    product.quantity = quantity;

    return await this.cartDao.updateOne(cid, cart);
  }
}

export default CartManager;
