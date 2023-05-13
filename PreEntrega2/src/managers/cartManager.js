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

  async deleteOne(id) {
    return this.cartDao.deleteOne(id);
  }

  async addProduct(cid, pid) {
    const cart = await this.cartDao.getOne(cid);
    console.log('add cart manager recibe');
    console.log(cart);

    if (!cart.id) {
      return false;
    }

    const oldcart = {
      id: cart.id,
      status: cart.status,
      products: [],
    };

    const product = await this.productDao.getOne(pid);
    if (!product.id) {
      return false;
    }

    if (cart.products.length) {
      cart.products.forEach((product) => {
        oldcart.products.push({
          product: product.id,
          quantity: product.quantity
        });
      });
      const existingProduct = oldcart.products.findIndex((p) => p.product.toString() === pid.toString());

      if (existingProduct >= 0) {
        oldcart.products[existingProduct].quantity += 1
      } else {
        oldcart.products.push({ product: product.id, quantity: 1 });
      }

    } else {
      oldcart.products.push({ product: product.id, quantity: 1 });
    }
    return await this.cartDao.updateOne(cid, oldcart);
  }

  async deleteProduct(cid, pid) {
    const cart = await this.cartDao.getOne(cid);
    if (!cart || !cart.products.length) {
      return false
    }
    const product = cart.products.find(product => product.id.toString() === pid.toString())
    if (!product) {
      return false
    }

    const oldcart = {
      id: cart.id,
      status: cart.status,
      products: [],
    };

    cart.products.forEach((product) => {
      if (product.id.toString() !== pid.toString()) {
        oldcart.products.push({
          product: product.id,
          quantity: product.quantity
        });
      }
    });
    return await this.cartDao.updateOne(cid, oldcart);
  }

  async updateProduct(cid, pid, quantity) {
    const cart = await this.cartDao.getOne(cid);
    if (!cart || cart.products.length) {
      return false
    }

    const product = cart.products.find(product => product.id.toString() === pid.toString())
    if (product) {
      return false
    }

    const oldProducts = cart.products.map(product => product);
    oldProducts.forEach((product) => {
      if (product.id.toString() === pid.toString()) {
        product.quantity = quantity;
      }
    });
    cart.products = oldProducts;
    return await this.cartDao.updateOne(cid, cart);
  }
}

export default CartManager;
