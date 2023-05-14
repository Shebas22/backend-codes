import ProductMongooseDao from "../daos/ProductMongooseDao.js";

class ProductManager {
  constructor() {
    this.productDao = new ProductMongooseDao();
  }

  // Reglas a comprobar
  verify(product) {
    return (
      product.title &&
      product.description &&
      product.price &&
      product.thumbnail &&
      product.code &&
      product.stock
    );
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
