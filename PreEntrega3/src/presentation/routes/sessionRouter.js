import { Router } from 'express';
import { current, login, signup, logout, forgetPassword, forgetPasswordRequest } from "../controllers/sessionController.js";
import auth from '../middlewares/auth.js';
import authForgetPassword from '../middlewares/authForgetPassword.js';

const sessionRouter = Router();

sessionRouter.post('/logout', logout);

sessionRouter.post('/login', login);
sessionRouter.get('/current', auth, current);
sessionRouter.post('/signup', signup);

sessionRouter.post('/forget-password/request', forgetPasswordRequest)
sessionRouter.get('/forget-password', authForgetPassword, forgetPassword)

export default sessionRouter;
