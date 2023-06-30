import cartSchema from "../../models/mongoose/cartSchema.js";

class CartMongooseRepository {
  async find() {
    const cartsDocuments = await cartSchema.find();
    return cartsDocuments.map((document) => {
      return {
        id: document._id,
        products: document.products.map((product) => {
          return {
            id: product.id._id,
            title: product.id.title,
            description: product.id.description,
            price: product.id.price,
            thumbnail: product.id.thumbnail,
            code: product.id.code,
            stock: product.id.stock,
            status: product.id.status,
            quantity: product.quantity,
          };
        }),
        status: document.status,
      };
    });
  }

  async getOne(id) {
    const cartDocument = await cartSchema.findOne({ _id: id });
    if (!cartDocument) {
      throw new Error('Cart not found.')
    }
    const products = cartDocument.products.map((product) => {
      return {
        id: product.id._id,
        title: product.id.title,
        description: product.id.description,
        price: product.id.price,
        thumbnail: product.id.thumbnail,
        code: product.id.code,
        stock: product.id.stock,
        status: product.id.status,
        quantity: product.quantity,
      };
    });
    return {
      id: cartDocument._id,
      status: cartDocument.status,
      products: products,
    };
  }

  async create(data) {
    const cartDocument = await cartSchema.create(data);
    if (!cartDocument) {
      throw new Error('Cart not created')
    }
    return this.getOne(cartDocument.id);
  }

  async updateOne(id, data) {
    const cartDocument = await cartSchema.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });
    if (!cartDocument) {
      throw new Error('Cart not found.')
    }
    const products = cartDocument.products.map((product) => {
      return {
        id: product.id._id,
        title: product.id.title,
        description: product.id.description,
        price: product.id.price,
        thumbnail: product.id.thumbnail,
        code: product.id.code,
        stock: product.id.stock,
        status: product.id.status,
        quantity: product.quantity,
      };
    });
    return {
      id: cartDocument._id,
      status: cartDocument.status,
      products: products,
    };
  }

  async deleteOne(id) {
    const result = await cartSchema.deleteOne({ _id: id });
    if(!result){
      throw new Error('Cart not deleted.')
    }
    return result
  }
}

export default CartMongooseRepository;
