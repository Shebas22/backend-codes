import ProductMongooseDao from "../daos/productMongooseDao.js"

class ProductManager {
  constructor() {
    this.productDao = new ProductMongooseDao();
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
    return this.productDao.paginate(req);
  }

  async getOne(id) {
    return this.productDao.getOne(id);
  }

  async create(data) {
    if (this.verify(data)) {
      return await this.productDao.create(data);
    }
  }

  async updateOne(id, data) {
    if (this.verify(data)) {
      return this.productDao.updateOne(id, data);
    }
  }

  async deleteOne(id) {
    return this.productDao.deleteOne(id);
  }
}

export default ProductManager;
