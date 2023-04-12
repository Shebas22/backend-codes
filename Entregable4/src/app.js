// Imports
import express from 'express';
import { engine } from 'express-handlebars';
import cartRouter from './routes/cartRouter.js';
import productRouter from './routes/productRouter.js';
import viewsRouter from './routes/viewsRouter.js';
import { resolve } from 'path';
import { Server } from 'socket.io';
import ProductManager from './controllers/ProductManager.js';

const viewsPath = resolve('src/views');
const productManager = new ProductManager();

// Inicializando el servidor y Router
const server = express()
server.use(express.json())
server.use(express.urlencoded({ extended: true }));

server.use('/api/products', productRouter);
server.use('/api/carts', cartRouter);
server.use('/realtimeproducts', viewsRouter);

server.engine('handlebars', engine({
    layoutsDir: `${viewsPath}`,
    defaultLayout: `${viewsPath}/layouts/main.handlebars`,
}));
server.set('view engine', 'handlebars');
server.set('views', viewsPath);

// Iniciando el listener
const httpServer = server.listen(8083, () => {
    console.log('Server listening on port 8083');
});
const socketServer = new Server(httpServer);

// Encendiendo el socket
socketServer.on('connection', socket => {
    console.log('New client connected');
    async () => socket.emit('productsList', await productManager.get());
    socket.on('productDelete', async (data) => {
        console.log(data);
        await productManager.delete(data) ? console.log("deleted") : console.log("no deleted");
        socket.emit('productsList', await productManager.get());
    });

    socket.on('productCreate', async (data) => {
        console.log(data);
        await productManager.add(data) ? console.log("create") : console.log("no create");
        socket.emit('productsList', await productManager.get());
    });
});

export default httpServer;