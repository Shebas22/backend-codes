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

const cartRouter = Router();

cartRouter.get("/", list);
cartRouter.get("/:id", getOne);
cartRouter.post("/", save);
cartRouter.put("/:id", update);
cartRouter.delete("/:id", deleteAllProducts);

cartRouter.post("/:cid/product/:pid", addProduct);
cartRouter.delete("/:cid/product/:pid", deleteProduct);
cartRouter.put("/:cid/product/:pid", updateProduct);

export default cartRouter;
