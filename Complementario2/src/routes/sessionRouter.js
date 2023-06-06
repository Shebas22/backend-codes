import { Router } from 'express';
import { forgetPassword, login, loginGithub, loginGithubCallback, logout, signup } from "../controllers/sessionController.js";

const sessionRouter = Router();

// sessionRouter.post('/logout', logout);

sessionRouter.post('/login', login);
sessionRouter.get('/current', auth, current);
sessionRouter.post('/signup', signup);

// sessionRouter.post('/forget-password', forgetPassword)

export default sessionRouter;
