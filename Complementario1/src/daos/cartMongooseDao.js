import cartSchema from "./models/cartSchema.js";

class CartMongooseDao {

  async find() {
    const cartsDocuments = await cartSchema
    .find();

    return cartsDocuments.map(document => ({
      id: document._id,
      products: document.products.map(product => ({
        id: product._id,
        title: product.title,
        description: product.description,
        price: product.price,
        thumbnail: product.thumbnail,
        code: product.code,
        stock: product.stock,
        status: product.status
      })),
      status: document.status
    }));
  }

  async getOne(id) {
    const cartDocument = await cartSchema
      .findOne({ _id: id })
    if (!cartDocument) {
      return false
    }

    return {
      id: cartDocument._id,
      products: cartDocument.products.map(product => ({
        id: product._id,
        title: product.title,
        description: product.description,
        price: product.price,
        thumbnail: product.thumbnail,
        code: product.code,
        stock: product.stock,
        status: product.status
      })),
      status: cartDocument.status
    }
  }

  async create(data) {
    const cartDocument = await cartSchema
    .create(data);

    return {
      id: cartDocument._id,
      products: cartDocument.products.map(product => ({
        id: product._id,
        title: product.title,
        description: product.description,
        price: product.price,
        thumbnail: product.thumbnail,
        code: product.code,
        stock: product.stock,
        status: product.status
      })),
      status: cartDocument.status
    }
  }

  async updateOne(id, data) {
    const cartDocument = await cartSchema
    .findOneAndUpdate({ _id: id }, data, { new: true })
  if (!cartDocument) {
    return false
  }

    return {
      id: cartDocument._id,
      products: cartDocument.products.map(product => ({
        id: product._id,
        title: product.title,
        description: product.description,
        price: product.price,
        thumbnail: product.thumbnail,
        code: product.code,
        stock: product.stock,
        status: product.status
      })),
      status: cartDocument.status
    }
  }
  
  async deleteOne(id) {
    return cartSchema.deleteOne({ _id: id });
  }
}

export default CartMongooseDao;
