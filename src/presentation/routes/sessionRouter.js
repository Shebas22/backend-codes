import { Router } from 'express';
import { current, login, signup, logout, forgetPassword, changePassword, forgetPasswordRequest } from "../controllers/sessionController.js";
import auth from '../middlewares/auth.js';

const sessionRouter = Router();

sessionRouter.post('/logout', auth, logout);

sessionRouter.post('/login', login);
sessionRouter.get('/current', auth, current);
sessionRouter.post('/signup', signup);

sessionRouter.get('/forget-password/form',  forgetPassword)
sessionRouter.get('/forget-password/request', forgetPasswordRequest);
sessionRouter.put('/forget-password/changePassword',auth, changePassword);

export default sessionRouter;
