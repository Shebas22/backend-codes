import { Router } from "express";
import { deleteOne, getOne, list, save, update,} from "../controllers/productController.js";
import auth from "../middlewares/auth.js";
import authorization from "../middlewares/authorization.js";

const productRouter = Router();

// productRouter.get("/", list);
productRouter.get("/", auth, authorization('getProducts'), list);
// productRouter.get("/:id", getOne);
productRouter.get("/:id",auth, authorization('getProduct'), getOne);
// productRouter.post("/", save);
productRouter.post("/",auth, authorization('saveProduct'), auth, save);
productRouter.put("/:id",auth, authorization('updateProduct'),  update);
productRouter.delete("/:id",auth, authorization('deleteProduct'),  deleteOne);
// productRouter.put("/:id",auth, authorization('updateProduct'), auth, update);
// productRouter.delete("/:id",auth, authorization('deleteProduct'), auth, deleteOne);

export default productRouter;
