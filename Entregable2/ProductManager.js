const productos = [
  {
    title: "acelga",
    description: "aqui va la descripción del producto",
    price: 150,
    thumbnail: "https://i.imgur.com/tUVxVbG.png",
    code: "ace150",
    stock: 20,
  },
  {
    title: "aji",
    description: "aqui va la descripción del producto",
    price: 430,
    thumbnail: "https://i.imgur.com/9yIUkZk.png",
    code: "aji430",
    stock: 10,
  },
  {
    title: "ajo",
    description: "aqui va la descripción del producto",
    price: 150,
    thumbnail: "https://i.imgur.com/oOKVzcq.png",
    code: "ajo150",
    stock: 93,
  },
  {
    title: "alcaucil",
    description: "aqui va la descripción del producto",
    price: 150,
    thumbnail: "https://i.imgur.com/Fkl6USU.png",
    code: "alc150",
    stock: 25,
  },
  {
    title: "alcaucil",
    description: "aqui va la descripción del producto",
    price: 150,
    thumbnail: "https://i.imgur.com/Fkl6USU.png",
    code: "alc150",
    stock: 25,
  },
  {
    title: "anana",
    description: "aqui va la descripción del producto",
    price: 550,
    thumbnail: "https://i.imgur.com/R4rpUIq.png",
    code: "ana550",
    stock: 100,
  },
  {
    title: "apio",
    description: "aqui va la descripción del producto",
    price: 180,
    thumbnail: "https://i.imgur.com/73p4IIr.png",
    code: "api180",
    stock: 88,
  },
  {
    title: "banana",
    description: "aqui va la descripción del producto",
    price: 429,
    thumbnail: "https://i.imgur.com/iyp17n5.png",
    code: "ban429",
    stock: 46,
  },
  {
    title: "banana",
    description: "aqui va la descripción del producto",
    price: 429,
    thumbnail: "https://i.imgur.com/iyp17n5.png",
    code: "ban429",
    stock: 46,
  },
  {
    title: "banana",
    description: "aqui va la descripción del producto",
    price: 429,
    thumbnail: "https://i.imgur.com/iyp17n5.png",
    code: "ban429",
    stock: 46,
  },
  {
    title: "batata",
    description: "aqui va la descripción del producto",
    price: 220,
    thumbnail: "https://i.imgur.com/anh6M3L.png",
    code: "bat220",
    stock: 130,
  },
  {
    title: "berenjena",
    description: "aqui va la descripción del producto",
    price: 180,
    thumbnail: "https://i.imgur.com/anh6M3L.png",
    code: "ber180",
    stock: 20,
  },
  {
    title: "berenjena",
    description: "aqui va la descripción del producto",
    price: 180,
    thumbnail: "https://i.imgur.com/anh6M3L.png",
    code: "ber180",
    stock: 20,
  },
];

const fs = require("fs").promises;

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
  async load(path) {
    let object = {};
    try {
      const productFile = await fs.readFile(this.path, `utf-8`);
      object = JSON.parse(productFile);
      this.#autoId = object.nextId;
      this.#products = object.products;
      //   console.log(this.#autoId);
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
      return `Error al escribir el archivo`;
    }
  }

  // Reglas a comprobar
  verify(product) {
    let value = false;
    value =
      (product.title &&
        product.description &&
        product.price &&
        product.thumbnail &&
        product.code &&
        product.stock &&
        true) ||
      false
        ? this.#products.filter((value) => value.code === product.code)
            .length ?? false > 0
          ? console.log("Código existente") && false
          : true
        : console.log("Todos los campos son obligatorios") && false;
    return value;
  }

  // Agregar Productos
  async addProduct(product) {
    await this.load();
    this.verify(product)
      ? Object.assign(product, { id: this.#autoId++ }) &&
        this.#products.push(product)
      : console.log("Producto no agregado");
    await this.charge();
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
    idProduct !== -1 && this.verify(product)
      ? Object.assign(product, { id: id }) &&
        this.#products.splice(idProduct, 1, product)
      : (await this.addProduct(product)) &&
        console.log(`Producto no encontrado, se agregó al listado`);
    await this.charge();
  }

  // Eliminar producto
  async deleteProduct(id) {
    await this.load();
    const idProduct = this.#products.findIndex((item) => item.id === id);
    idProduct !== -1
      ? this.#products.splice(idProduct, 1) && console.log(`Producto eliminado`)
      : console.log(`Producto no encontrado, no se eliminó ningun producto`);
    await this.charge();
  }

  // Producto por ID
  async getProductById(id) {
    await this.load();
    return this.#products.find((item) => item.id === id) ?? "Not Found";
  }
}

// Bucle de ejecución
const main = async () => {
  // Instanciar ProductManager
  const manager = new ProductManager("./productos.json");
  // Cargar productos
  productos.map(async (product) => {
    await manager.addProduct(product);
  });
  
  // Prueba del método getProducts
  console.log(await manager.getProducts());

  // Eliminar 2° producto
  await manager.deleteProduct(2);

  // Actualizar 1° producto
  await manager.updateProduct(
    {
      title: "brocoli",
      description: "aqui va la descripción del producto",
      price: 250,
      thumbnail: "https://i.imgur.com/W9XGUbf.png",
      code: "bro250",
      stock: 50,
    },
    1
  );

  // Prueba del método getProductById
  console.log("\n");
  console.log("Buscar ID:");
  console.log(await manager.getProductById(1));
  console.log(await manager.getProductById(2));
};

main();
