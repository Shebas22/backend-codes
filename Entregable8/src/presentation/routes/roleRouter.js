import { Router } from 'express';
import { list, deleteOne, getOne, save, update } from "../controllers/roleController.js";
import auth from "../middlewares/auth.js";
import authorization from "../middlewares/authorization.js";

const roleRouter = Router();

roleRouter.get('/', auth, authorization('getRoles'), list);
roleRouter.get('/:id', auth, authorization('getRole'), getOne);
roleRouter.post('/', auth, authorization('saveRole'), save);
// roleRouter.post('/', save);
roleRouter.put('/:id', auth, authorization('updateRole'), update);
roleRouter.delete('/:id', auth, authorization('deleteRole'), deleteOne);

export default roleRouter;