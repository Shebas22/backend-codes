import { Router } from "express";
import { addProduct, buy, deleteAllProducts, deleteProduct, getOne, list, save, update, updateProduct } from "../controllers/cartController.js";
import auth from "../middlewares/auth.js";
import authorization from "../middlewares/authorization.js";

const cartRouter = Router();

cartRouter.get("/", list);
// cartRouter.get("/", auth, list);
// cartRouter.get("/", auth, authorization('getCarts'), list);
cartRouter.get("/:id", getOne);
// cartRouter.get("/:id", auth, authorization('getCart'), getOne);
cartRouter.post("/", save);
// cartRouter.post("/", auth, authorization('saveCart'), save);
cartRouter.put("/:id", auth, authorization('updateCart'), update);
cartRouter.delete("/:id", auth, authorization('deleteCart'), deleteAllProducts);

cartRouter.post("/:cid/product/:pid", addProduct);
// cartRouter.post("/:cid/product/:pid", auth, authorization('addProduct'), addProduct);
cartRouter.put("/:cid/product/:pid", updateProduct);
// cartRouter.put("/:cid/product/:pid", auth, authorization('updateProduct'), updateProduct);
cartRouter.delete("/:cid/product/:pid", auth, authorization('deleteProduct'), deleteProduct);

cartRouter.post("/:cid/purchase", auth, authorization('buy'), buy);

export default cartRouter;
