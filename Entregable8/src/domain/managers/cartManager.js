import ProductMongooseDao from "../../data/daos/mongoose/productMongooseDao.js";
import CartMongooseDao from "../../data/daos/mongoose/cartMongooseDao.js";

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
    if (!cart.products.length) {
      throw new Error('Cart is empty.');
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
    if (!cart.products.length) {
      throw new Error('Cart is empty.')
    }
    const index = cart.products.findIndex(
      (product) => product.id.toString() === pid.toString()
    );
    if (index >= 0) {
      cart.products.splice(index, 1);
      return await this.cartDao.updateOne(cid, cart);
    } else {
      throw new Error('Product not found.')
    }
  }

  async updateProduct(cid, pid, quantity) {
    const cart = await this.cartDao.getOne(cid);
    if (!cart.products.length) {
      throw new Error('Cart is empty.')
    }
    const product = cart.products.find(
      (product) => product.id.toString() === pid.toString()
    );
    if (!product) {
      throw new Error('Product not found.')
    }
    product.quantity = quantity;
    return await this.cartDao.updateOne(cid, cart);
  }
}

export default CartManager;
