import fs from "fs/promises";
import { resolve } from 'path';

const cartsPath = resolve('src');

class CartManager {
    #autoId = 1;
    #carts;
    path;

    // Constructor
    constructor() {
        this.#carts = [];
        this.path = `${cartsPath}/carts.json`;
        // this.path = "./src/carts.json";
    }

    // Extraccion de carritos desde el archivo
    async load() {
        let object = {};
        try {
            const cartsFile = await fs.readFile(this.path, `utf-8`);
            object = JSON.parse(cartsFile);
            this.#autoId = object.nextId;
            this.#carts = object.carts;
        } catch (error) {
            await this.charge();
        }
    }

    // Carga carritos al archivo
    async charge() {
        let object = {};
        Object.assign(object, { nextId: this.#autoId, carts: this.#carts });
        try {
            fs.writeFile(this.path, JSON.stringify(object, null, 2));
        } catch (error) {
            // return false
            throw new Error(e);
        }
    }


    // Crear carrito
    async create() {
        await this.load();
        const cart = { products: [], id: this.#autoId++ }
        this.#carts.push(cart);
        await this.charge();
        return cart;
    }

    // Listar carritos
    async get() {
        await this.load();
        return this.#carts;
    }

    async addProductToCart(cId, productAdd) {
        await this.load();
        const { product } = productAdd
        const cartIndex = this.#carts.findIndex((item) => item.id == cId);
        if (cartIndex !== -1) {
            const { products } = this.#carts[cartIndex]
            const productIndex = products.findIndex((item) => item.product.id == product.id);
            if (productIndex !== -1) {
                products[productIndex].quantity += productAdd.quantity
            }
            else {
                products.push(productAdd)
            }
            await this.charge();
            return product
        }
        return false
    }


    // Eliminar carrito
    async delete(id) {
        await this.load();
        const cartIndex = this.#carts.findIndex((item) => item.id == id);
        if (cartIndex !== -1) {
            const cart = this.#carts.splice(cartIndex, 1);
            await this.charge();
            return cart;
        }
        return false;
    }

    // Carrito por ID
    async getById(id) {
        await this.load();
        // return this.#carts.find((item) => item.id === id) ?? "Not Found";
        return this.#carts.find((item) => item.id === id);
    }
}

export default CartManager