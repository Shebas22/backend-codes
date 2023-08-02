import SessionManager from "../../domain/managers/sessionManager.js";
import UserManager from "../../domain/managers/userManager.js";
import { generateToken } from "../../shared/access.js";
import Email from "../../shared/email.js";

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // await loginValidation.parseAsync(req.body);
    const manager = new SessionManager();
    const accessToken = await manager.login(email, password);
    res
      .cookie("accessToken", accessToken, {
        maxAge: 60,
        httpOnly: true,
      })
      .status(200)
      .send({ status: "success", message: "Login success!", accessToken });
  } catch (error) {
    next(error);
  }
};


export const current = async (req, res, next) => {
  try {
    const accessToken = await generateToken(req.user)
    res
      .cookie("accessToken", accessToken, {
        maxAge: 60,
        httpOnly: true,
      })
      .status(200)
      .send({ status: "success", message: "Current", accessToken , payload: req.user});
  } catch (error) {
    next(error);
  }
};

export const signup = async (req, res, next) => {
  try {
    const manager = new SessionManager();
    const user = await manager.signup(req.body);
    res.status(201).send({ status: "success", user, message: "User created." });
  } catch (error) {
    next(error);
  }
};

export const forgetPassword = async (req, res, next) => {
  // Se aplica para darle funcionalidad a falta de front
    await current(req, res, next)
};

export const forgetPasswordRequest = async (req, res, next) => {
  try {
    const { email } = req.body;
    const manager = new UserManager();
    const user = await manager.getOneByEmail(email)
    const accessToken = await generateToken(user)
    const forgetEmail = new Email();
    const result = await forgetEmail.sendForgetPassword(user, accessToken)
    res.status(201).send({ status: "success", message: "Password reset email sent." });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res
      .cookie("accessToken", null, {
        maxAge: 0,
        httpOnly: true,
      })
      .status(200)
      .send({ status: "success", message: "Logout success!"});
  } catch (error) {
    next(error);
  }
};
