import cartSchema from "./models/cartSchema.js";

class CartMongooseDao {
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
      return false;
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
      return false;
    }

    return this.getOne(cartDocument.id);
  }

  async updateOne(id, data) {
    const cartDocument = await cartSchema.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });

    if (!cartDocument) {
      return false;
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
    return cartSchema.deleteOne({ _id: id });
  }
}

export default CartMongooseDao;
