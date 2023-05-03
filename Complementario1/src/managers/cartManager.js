import ProductMongooseDao from "../daos/ProductMongooseDao.js";
import CartMongooseDao from "../daos/CartMongooseDao.js";

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
    if (!cart) {
      return false
    }
    const product = await this.productDao.getOne(pid);
    if (!product) {
      return false
    }

    if(cart.products.length>0){
    const oldProductsId = cart.products.map(product => product.id);
    oldProductsId.forEach((id) => {
      if (id.toString() !== product.id.toString()) {
        oldProductsId.push(product.id);
      }
    });
    cart.products = oldProductsId;
    }else{
      cart.products.push(product.id);
    }
    return await this.cartDao.updateOne(cid, cart);
  }
}

export default CartManager;
