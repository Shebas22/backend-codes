import container from "../../container.js";

class CartManager {
  constructor() {
    this.productRepository = container.resolve('ProductRepository');
    this.cartRepository = container.resolve('CartRepository');
  }

  async find() {
    return this.cartRepository.find();
  }

  async getOne(id) {
    return this.cartRepository.getOne(id);
  }

  async create(data) {
    return await this.cartRepository.create(data);
  }

  async updateOne(id, data) {
    return this.cartRepository.updateOne(id, data);
  }

  async deleteAllProducts(id) {
    const cart = await this.cartRepository.getOne(id);
    if (!cart.products.length) {
      throw new Error('Cart is empty.');
    }
    const clearCart = {
      id: cart.id,
      status: cart.status,
      products: [],
    };
    return await this.cartRepository.updateOne(id, clearCart);
  }

  async addProduct(cid, pid) {
    const cart = await this.cartRepository.getOne(cid);
    const product = await this.productRepository.getOne(pid);
    const existingProduct = cart.products.find(
      (p) => p.id.toString() === pid.toString()
    );
    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      cart.products.push({ id: product.id, quantity: 1 });
    }
    return await this.cartRepository.updateOne(cid, cart);
  }

  async deleteProduct(cid, pid) {
    const cart = await this.cartRepository.getOne(cid);
    if (!cart.products.length) {
      throw new Error('Cart is empty.')
    }
    const index = cart.products.findIndex(
      (product) => product.id.toString() === pid.toString()
    );
    if (index >= 0) {
      cart.products.splice(index, 1);
      return await this.cartRepository.updateOne(cid, cart);
    } else {
      throw new Error('Product not found.')
    }
  }

  async updateProduct(cid, pid, quantity) {
    const cart = await this.cartRepository.getOne(cid);
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
    return await this.cartRepository.updateOne(cid, cart);
  }
}

export default CartManager;
