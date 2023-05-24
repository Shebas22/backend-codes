import SessionManager from "../managers/sessionManager.js";

const manager = new SessionManager();

export const login = async (req, res, next) => {
  try {
    const {email} = req.body;
    const login = await manager.login(req);
    req.session.user = { email };
    return res.status(200).json({ status: "success", message: "Login success!" });
  } catch (error) {
    next(error)
  }
};

export const logout = async (req, res, next) => {
  req.session.destroy((err) => {
    if (!err) {
      return res.status(200).json({ status: "success", message: "Logout success!" });
    }
    return res.status(401).json({ status: "error", message: "Logout error!", body: err });
  });
};

export const signup = async (req, res, next) => {
  try {
    const userSignUp = await manager.signup(req);
    return res.status(200).json({ status: "success", userSignUp, message: "SignUp success!" });
  } catch (error) {
    next(error)
  }
};
