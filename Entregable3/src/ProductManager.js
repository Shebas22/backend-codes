import fs from "fs/promises";
// const fs = require("fs").promises;

class ProductManager {
  #autoId = 1;
  #products;
  path;

  // Constructor
  constructor(path) {
    this.#products = [];
    this.path = path;
  }

  // Extraccion de productos desde el archivo
  async load() {
    let object = {};
    try {
      const productFile = await fs.readFile(this.path, `utf-8`);
      object = JSON.parse(productFile);
      this.#autoId = object.nextId;
      this.#products = object.products;
    } catch (error) {
      await this.charge();
    }
  }

  // Carga productos al archivo
  async charge() {
    let object = {};
    Object.assign(object, { nextId: this.#autoId, products: this.#products });
    try {
      fs.writeFile(this.path, JSON.stringify(object, null, 2));
    } catch (error) {
      throw new Error(e);
    }
  }

  // Reglas a comprobar
  verify(product) {
    const condition =
      product.title &&
      product.description &&
      product.price &&
      product.thumbnail &&
      product.code &&
      product.stock;
    if (condition) {
      return !this.#products.filter((value) => value.code === product.code).length ??
        false > 0;
    } else {
      return false;
    }
  }

  // Agregar Productos
  async addProduct(product) {
    await this.load();
    const condition = this.verify(product);
    if (condition) {
      Object.assign(product, { id: this.#autoId++ });
      this.#products.push(product);
      await this.charge();
      return true;
    }
    return false;
  }

  // Listar productos
  async getProducts() {
    await this.load();
    return this.#products;
  }

  // Actualizar productos
  async updateProduct(product, id) {
    await this.load();
    const idProduct = this.#products.findIndex((item) => item.id === id);
    const condition = idProduct !== -1 && this.verify(product);
    if (condition) {
      Object.assign(product, { id: id });
      this.#products.splice(idProduct, 1, product);
      await this.charge();
      return true;
    } else {
      await this.addProduct(product);
      return false;
    }
  }

  // Eliminar producto
  async deleteProduct(id) {
    await this.load();
    const idProduct = this.#products.findIndex((item) => item.id === id);
    if (idProduct !== -1) {
      this.#products.splice(idProduct, 1);
      await this.charge();
      return true;
    }
    return false;
  }

  // Producto por ID
  async getProductById(id) {
    await this.load();
    // return this.#products.find((item) => item.id === id) ?? "Not Found";
    return this.#products.find((item) => item.id === id);
  }
}

export default ProductManager