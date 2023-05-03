import ProductMongooseDao from "../daos/ProductMongooseDao.js";

class ProductManager {
  constructor() {
    this.productDao = new ProductMongooseDao();
  }

  async find() {
    return this.productDao.find();
  }

  async getOne(id) {
    return this.productDao.getOne(id);
  }

  async create(data) {
    return await this.productDao.create(data);
  }

  async updateOne(id, data) {
    return this.productDao.updateOne(id, data);
  }

  async deleteOne(id) {
    return this.productDao.deleteOne(id);
  }
}

export default ProductManager;
