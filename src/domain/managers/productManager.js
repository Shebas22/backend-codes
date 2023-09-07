import container from "../../container.js";

class ProductManager {
  constructor() {
    this.productRepository = container.resolve('ProductRepository');
  }

  // Reglas a comprobar
  verify(product) {
    if (
      product.title &&
      product.description &&
      product.price &&
      product.thumbnail &&
      product.code &&
      product.stock
    ) {
      return true;
    }
    throw new Error('A product was expected');
  }

  async paginate(req) {
    return this.productRepository.paginate(req);
  }

  async getOne(id) {
    return this.productRepository.getOne(id);
  }

  async create(data) {
    if (this.verify(data)) {
      return await this.productRepository.create(data);
    }
  }

  async updateOne(id, data) {
    if (this.verify(data)) {
      return this.productRepository.updateOne(id, data);
    }
  }

  async deleteOne(id) {
    return this.productRepository.deleteOne(id);
  }
}

export default ProductManager;
