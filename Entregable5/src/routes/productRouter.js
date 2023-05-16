import { Router } from "express";
import {
  deleteOne,
  getOne,
  list,
  save,
  update,
} from "../controllers/productController.js";

const productRouter = Router();

productRouter.get("/", list);
productRouter.post("/", save);
productRouter.get("/:id", getOne);
productRouter.put("/:id", update);
productRouter.delete("/:id", deleteOne);

export default productRouter;
