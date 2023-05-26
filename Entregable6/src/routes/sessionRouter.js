import { Router } from 'express';
import { forgetPassword, login, loginGithub, loginGithubCallback, logout, signup } from "../controllers/sessionController.js";
import passport from 'passport';

const sessionRouter = Router();

// sessionRouter.post('/login', login);
// sessionRouter.post('/signup', signup);
sessionRouter.post('/logout', logout);

sessionRouter.post('/login', passport.authenticate('login', {failureRedirect: '/api/sessions/fail'}), login);
sessionRouter.post('/signup', passport.authenticate('signup', {failureRedirect: '/api/sessions/fail'}), signup);
sessionRouter.post('/forget-password', forgetPassword);

sessionRouter.get('/github', passport.authenticate('github', { scope: ['user:email']}), loginGithub);
sessionRouter.get('/github-callback', passport.authenticate('github', { failureRedirect: '/login'}), loginGithubCallback)

export default sessionRouter;
