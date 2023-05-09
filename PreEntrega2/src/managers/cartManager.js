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
    console.log(cart);
    if (!cart.id) {
      return false;
    }
    const product = await this.productDao.getOne(pid);
    if (!product.id) {
      return false;
    }
    if (cart.products.length) {
      // console.log(cart.products);
    // let existingProduct = cart.products.map((p) => console.log(p));
    // let existingProduct = cart.products.find((p) => p.product.id.toString() === pid.toString());
    if (existingProduct) {
      existingProduct.quantity += 1;
    }
   } else {
      cart.products.push({ product: product.id, quantity: 1 });
    }
  
    return await this.cartDao.updateOne(cid, cart);
  }

  async deleteProduct(cid, pid) {
    const cart = await this.cartDao.getOne(cid);
    if (!cart || cart.products.length) {
      return false
    }
    const product = cart.products.find(product => product.id.toString() === pid.toString())
    if (product) {
      return false
    }

    const oldProductsId = cart.products.map(product => product.id);
    cart.products = oldProductsId.filter(product => product.id.toString() !== pid.toString());
    return await this.cartDao.updateOne(cid, cart);
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
