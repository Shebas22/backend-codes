import EmailManager from "../../domain/managers/emailManager.js";
import SessionManager from "../../domain/managers/sessionManager.js";
import UserManager from "../../domain/managers/userManager.js";
import { generateToken } from "../../shared/access.js";


export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // await loginValidation.parseAsync(req.body);
    const manager = new SessionManager();
    const accessToken = await manager.login(email, password);
    req.logger.info("Login success.");
    res
      .cookie("accessToken", accessToken, {
        maxAge: 60,
        httpOnly: true,
      })
      .status(200)
      .send({ status: "success", message: "Login success."});
  } catch (error) {
    next(error);
  }
};


export const current = async (req, res, next) => {
  try {
    const accessToken = await generateToken(req.user)
    req.logger.info("Current.");
    res
      .cookie("accessToken", accessToken, {
        maxAge: 60,
        httpOnly: true,
      })
      .status(200)
      .send({ status: "success", message: "Current.", payload: req.user});
  } catch (error) {
    next(error);
  }
};

export const signup = async (req, res, next) => {
  try {
    const manager = new SessionManager();
    const user = await manager.signup(req.body);
    req.logger.info("User created.");
    res.status(201).send({ status: "success", user, message: "User created." });
  } catch (error) {
    next(error);
  }
};

export const forgetPassword = async (req, res, next) => {
  const { accessToken } = req.params;
  res.render('changePassword', { accessToken: accessToken})
};

export const changePassword = async (req, res, next) => {
  const manager = new UserManager();
  try {
    const result = await manager.updateOne(req.user.id, req.body);
    req.logger.info("Password changed.");
    return res.status(201).json({ status: "success", result, message: "Password changed." });
  } catch (error) {
    next(error)
  }
};

export const forgetPasswordRequest = async (req, res, next) => {
  try {
    const { email } = req.body;
    const userManager = new UserManager();
    const user = await userManager.getOneByEmail(email)
    const accessToken = await generateToken(user)
    const manager = new EmailManager();
    await manager.send('forgetPassword.hbs', user,accessToken);
    req.logger.info("Email sended.");
    res.status(200).send({ status: 'success' , message: "Email sended."});
}
catch (e) {
    next(e);
}
};

export const logout = async (req, res, next) => {
  try {
    req.logger.info("Logout success.");
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
