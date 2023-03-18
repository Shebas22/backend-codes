const productos = [
    {
        "title": "acelga",
        "description": "aqui va la descripción del producto",
        "price": 150,
        "thumbnail": "https://i.imgur.com/tUVxVbG.png",
        "code": "ace150",
        "stock": 20,
    },
    {
        "title": "aji",
        "description": "aqui va la descripción del producto",
        "price": 430,
        "thumbnail": "https://i.imgur.com/9yIUkZk.png",
        "code": "aji430",
        "stock": 10,
    },
    {
        "title": "ajo",
        "description": "aqui va la descripción del producto",
        "price": 150,
        "thumbnail": "https://i.imgur.com/oOKVzcq.png",
        "code": "ajo150",
        "stock": 93,
    },
    {
        "title": "alcaucil",
        "description": "aqui va la descripción del producto",
        "price": 150,
        "thumbnail": "https://i.imgur.com/Fkl6USU.png",
        "code": "alc150",
        "stock": 25,
    },
    {
        "title": "alcaucil",
        "description": "aqui va la descripción del producto",
        "price": 150,
        "thumbnail": "https://i.imgur.com/Fkl6USU.png",
        "code": "alc150",
        "stock": 25,
    },
    {
        "title": "anana",
        "description": "aqui va la descripción del producto",
        "price": 550,
        "thumbnail": "https://i.imgur.com/R4rpUIq.png",
        "code": "ana550",
        "stock": 100,
    },
    {
        "title": "apio",
        "description": "aqui va la descripción del producto",
        "price": 180,
        "thumbnail": "https://i.imgur.com/73p4IIr.png",
        "code": "api180",
        "stock": 88,
    },
    {
        "title": "banana",
        "description": "aqui va la descripción del producto",
        "price": 429,
        "thumbnail": "https://i.imgur.com/iyp17n5.png",
        "code": "ban429",
        "stock": 46,
    },
    {
        "title": "banana",
        "description": "aqui va la descripción del producto",
        "price": 429,
        "thumbnail": "https://i.imgur.com/iyp17n5.png",
        "code": "ban429",
        "stock": 46,
    },
    {
        "title": "banana",
        "description": "aqui va la descripción del producto",
        "price": 429,
        "thumbnail": "https://i.imgur.com/iyp17n5.png",
        "code": "ban429",
        "stock": 46,
    },
    {
        "title": "batata",
        "description": "aqui va la descripción del producto",
        "price": 220,
        "thumbnail": "https://i.imgur.com/anh6M3L.png",
        "code": "bat220",
        "stock": 130,
    },
    {
        "title": "berenjena",
        "description": "aqui va la descripción del producto",
        "price": 180,
        "thumbnail": "https://i.imgur.com/anh6M3L.png",
        "code": "ber180",
        "stock": 20,
    },
    {
        "title": "berenjena",
        "description": "aqui va la descripción del producto",
        "price": 180,
        "thumbnail": "https://i.imgur.com/anh6M3L.png",
        "code": "ber180",
        "stock": 20,
    },
    {
        "title": "brocoli",
        "description": "aqui va la descripción del producto",
        "price": 250,
        "thumbnail": "https://i.imgur.com/W9XGUbf.png",
        "code": "bro250",
        "stock": 50,
    }]



class ProductManager {
    #autoId = 1;
    // Constructor
    constructor() {
        this.products = [];
    }
    // Agregar Productos
    addProduct(product) {
        product.title && product.description && product.price && product.thumbnail && product.code && product.stock && true || false
            ? (this.products.length > 0)
                ? (this.products.filter(value => value.code === product.code).length > 0)
                    ? console.log("Código existente")
                    : Object.assign(product, { id: this.#autoId++ }) &&
                    this.products.push(product)
                : Object.assign(product, { id: this.#autoId++ }) &&
                this.products.push(product)
            : console.log("Todos los campos son obligatorios")
    }
    // Listar Productos agregados
    getProducts() {
        return this.products
    }
    // Producto por ID
    getProductById(id) {
        return this.products.find((item) => item.id === id) ?? "Not Found"
    }
};



// Bucle de ejecución
{
    // Instanciar ProductManager
    const manager = new ProductManager()
    // Cargar productos
    productos.map((product) => {
        manager.addProduct(product)
    })
    // Prueba del método getProducts
    console.log(manager.getProducts());
    // Prueba del método getProductById
    console.log("\n");
    console.log("Buscar ID:");
    console.log(manager.getProductById(4));
}
