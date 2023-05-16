import SessionManager from "../managers/sessionManager.js";

const manager = new SessionManager();

export const login = async (req, res) => {
  const { email, password } = req.body;
  const login = await manager.login(email, password);

  if (!login) {
    return res.status(401).send({
      status: "error",
      message: "Login failed, invalid email or password.",
    });
  }

  req.session.user = { email };
  return res.status(200).json({ status: "success", message: "Login success!" });
};

export const logout = async (req, res) => {
  req.session.destroy((err) => {
    if (!err) {
      return res.status(200).json({ status: "success", message: "Logout success!" });
    }
    return res
      .status(401)
      .send({ status: "error", message: "Logout error!", body: err });
  });
};

export const signup = async (req, res) => {
  const userSignUp = await manager.signup(req);
  if (userSignUp) {
    return res
      .status(200)
      .json({ status: "success", userSignUp, message: "SignUp success!" });
  }
  return res
  .status(401)
  .send({ status: "error", message: "SignUp error!" });
};
