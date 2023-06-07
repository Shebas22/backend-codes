import { Router } from "express";
import { addProduct, deleteAllProducts, deleteProduct, getOne, list, save, update, updateProduct } from "../controllers/cartController.js";
import auth from "../middlewares/auth.js";
import authorization from "../middlewares/authorization.js";

const cartRouter = Router();

cartRouter.get("/", auth, list);
cartRouter.get("/", auth, authorization('getCarts'), list);
cartRouter.get("/:id", auth, authorization('getCart'), getOne);
cartRouter.post("/", auth, authorization('saveCart'), save);
cartRouter.put("/:id", auth, authorization('updateCart'), update);
cartRouter.delete("/:id", auth, authorization('deleteCart'), deleteAllProducts);

cartRouter.post("/:cid/product/:pid", auth, authorization('addProduct'), addProduct);
cartRouter.put("/:cid/product/:pid", auth, authorization('updateProduct'), updateProduct);
cartRouter.delete("/:cid/product/:pid", auth, authorization('deleteProduct'), deleteProduct);

export default cartRouter;
