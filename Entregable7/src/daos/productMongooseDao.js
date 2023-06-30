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
      throw new Error('Product not found.');
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
    if (!productDocument) {
      throw new Error('Product not created.');
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

  async updateOne(id, data) {
    const productDocument = await productSchema.findOneAndUpdate({ _id: id }, data, { new: true });
    if (!productDocument) {
      throw new Error('Product not found');
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
    const result = await productSchema.deleteOne({ _id: id });
    if (!result) {
      throw new Error('Product not deleted.')
    }
    return result
  }

}

export default ProductMongooseDao;
