import { Router } from "express";
import { deleteOne, getOne, list, save, update } from "../controllers/productController.js";

const productRouter = Router();

productRouter.get('/', list);
productRouter.get('/:id', getOne);
productRouter.post('/', save);
productRouter.put('/:id', update);
productRouter.delete('/:id', deleteOne);

export default productRouter;