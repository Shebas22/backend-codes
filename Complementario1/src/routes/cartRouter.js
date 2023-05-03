import { Router } from "express";
import { addProduct, deleteOne, getOne, list, save, update } from "../controllers/cartController.js";

const cartRouter = Router();

cartRouter.get('/', list);
cartRouter.get('/:id', getOne);
cartRouter.post('/', save);
cartRouter.put('/:id', update);
cartRouter.delete('/:id', deleteOne);
cartRouter.post('/:cid/product/:pid', addProduct)

export default cartRouter;