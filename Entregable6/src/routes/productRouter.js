import { Router } from "express";
import {
  deleteOne,
  getOne,
  list,
  save,
  update,
} from "../controllers/productController.js";
import auth from "../middlewares/auth.js";

const productRouter = Router();

productRouter.get("/", list);
productRouter.get("/:id", getOne);
productRouter.post("/", auth, save);
productRouter.put("/:id", auth, update);
productRouter.delete("/:id", auth, deleteOne);

export default productRouter;
