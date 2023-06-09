import productSchema from "./models/productSchema.js";
import { PaginationParameters } from 'mongoose-paginate-v2'

class ProductMongooseDao {

  async paginate(req) {
    const productsDocuments = await productSchema.paginate(...new PaginationParameters(req).get());

    productsDocuments.docs = productsDocuments.docs.map(product => ({
      id: product._id,
      title: product.title,
      description: product.description,
      price: product.price,
      thumbnail: product.thumbnail,
      code: product.code,
      stock: product.stock,
      status: product.status
    }))
    return productsDocuments;
  }

  async getOne(id) {
    const productDocument = await productSchema.findOne({ _id: id });
    if (!productDocument) {
      return false
    }

    return {
      id: productDocument._id,
      title: productDocument.title,
      description: productDocument.description,
      price: productDocument.price,
      thumbnail: productDocument.thumbnail,
      code: productDocument.code,
      stock: productDocument.stock,
      status: productDocument.status
    }
  }

  async create(data) {
    const productDocument = await productSchema.create(data);

    return {
      id: productDocument._id,
      title: productDocument.title,
      description: productDocument.description,
      price: productDocument.price,
      thumbnail: productDocument.thumbnail,
      code: productDocument.code,
      stock: productDocument.stock,
      status: productDocument.status
    }
  }

  async updateOne(id, data) {
    const productDocument = await productSchema.findOneAndUpdate({ _id: id }, data, { new: true });
    if (!productDocument) {
      return false
    }

    return {
      id: productDocument._id,
      title: productDocument.title,
      description: productDocument.description,
      price: productDocument.price,
      thumbnail: productDocument.thumbnail,
      code: productDocument.code,
      stock: productDocument.stock,
      status: productDocument.status
    }
  }

  async deleteOne(id) {
    return productSchema.deleteOne({ _id: id });
  }
}

export default ProductMongooseDao;
