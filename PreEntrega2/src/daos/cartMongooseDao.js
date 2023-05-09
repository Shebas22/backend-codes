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
console.log(cartDocument);
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

    const cartDocument = await cartSchema.findOneAndUpdate({ _id: id }, data, { new: true })
  
    if (!cartDocument) {
      return false;
    }

  
    const cart = {
      id: cartDocument._id,
      status: cartDocument.status,
      products: [],
    };
  
    cartDocument.products.forEach((product) => {
      cart.products.push({
        id: product.product._id,
        title: product.product.title,
        description: product.product.description,
        price: product.product.price,
        thumbnail: product.product.thumbnail,
        code: product.product.code,
        stock: product.product.stock,
        status: product.product.status,
        quantity: product.quantity,
      });
    });
  
    return cart;
  }


  // async updateOne(id, cart) {
  //   const cartDocument = await cartSchema
  //   .findOneAndUpdate({ _id: id }, cart, { new: true })
  // if (!cartDocument._id) {
  //   return false
  // }


  //   return {
  //     id: cartDocument._id,
  //     products: cartDocument.products.map(product => ({
  //       id: product._id,
  //       title: product.title,
  //       description: product.description,
  //       price: product.price,
  //       thumbnail: product.thumbnail,
  //       code: product.code,
  //       stock: product.stock,
  //       status: product.status
  //     })),
  //     status: cartDocument.status
  //   }
  // }
  
  async deleteOne(id) {
    return cartSchema.deleteOne({ _id: id });
  }
}

export default CartMongooseDao;
