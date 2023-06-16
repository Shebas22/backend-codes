import { Router } from 'express';
import { current, login, signup, logout } from "../controllers/sessionController.js";
import auth from '../middlewares/auth.js';

const sessionRouter = Router();

sessionRouter.post('/logout', logout);

sessionRouter.post('/login', login);
sessionRouter.get('/current', auth, current);
sessionRouter.post('/signup', signup);

// sessionRouter.post('/forget-password', forgetPassword)

export default sessionRouter;
