import { Router } from "express";
import {
  addProduct,
  deleteAllProducts,
  deleteProduct,
  getOne,
  list,
  save,
  update,
  updateProduct,
} from "../controllers/cartController.js";
import auth from "../middlewares/auth.js";

const cartRouter = Router();

cartRouter.get("/", list);
cartRouter.get("/:id", getOne);
cartRouter.post("/", auth, save);
cartRouter.put("/:id", auth, update);
cartRouter.delete("/:id", auth, deleteAllProducts);

cartRouter.post("/:cid/product/:pid", auth, addProduct);
cartRouter.delete("/:cid/product/:pid", auth, deleteProduct);
cartRouter.put("/:cid/product/:pid", auth, updateProduct);

export default cartRouter;
