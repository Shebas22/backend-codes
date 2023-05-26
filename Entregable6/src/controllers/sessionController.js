import SessionManager from "../managers/sessionManager.js";
import passport from "passport";

const manager = new SessionManager();

export const login = async (req, res) => {
  if (!req.user) return res.status(400).send({ status: 'error', message: 'Invalid credentials' });
  req.session.user = {
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    email: req.user.email,
  };
  return res.status(200).json({ status: "success", message: "Login success!" });
};

export const signup = async (req, res) => {
  return res.status(200).json({ status: "success", userSignUp, message: "SignUp success!" });
};

export const forgetPassword = async (req, res) => {
  const { email, password } = req.body;
  const manager = new UserManager();
  const dto = {
    email,
    password: await createHash(password, 10)
  };
  const user = await manager.forgetPassword(dto);
  res.status(200).send({ status: 'success', user, message: 'User change password.' });
};

export const logout = async (req, res, next) => {
  req.session.destroy((err) => {
    if (!err) {
      return res.status(200).json({ status: "success", message: "Logout success!" });
    }
    return res.status(401).json({ status: "error", message: "Logout error!", body: err });
  });
};

export const loginGithub = async (req, res, next) => {
  // passport.authenticate('github', { scope: ['user:email']})
  // try {
  // } catch (error) {
  //   next(error)
  // }
};

export const loginGithubCallback = async (req, res, next) => {
  req.session.user = req.user;
  console.log(req.user);
  res.redirect('/');
  // try {
  //   await passport.authenticate('github', { failureRedirect: '/login'})
  //   req.session.user = req.user;
  //   console.log(req.user);
  //   res.redirect('/');
  // } catch (error) {
  //   next(error)
  // }
};
// export const login = async (req, res, next) => {
//   try {
//     const {email} = req.body;
//     const login = await manager.login(req);
//     req.session.user = { email };
//     return res.status(200).json({ status: "success", message: "Login success!" });
//   } catch (error) {
//     next(error)
//   }
// };

// export const signup = async (req, res, next) => {
//   try {
//     const userSignUp = await manager.signup(req);
//     return res.status(200).json({ status: "success", userSignUp, message: "SignUp success!" });
//   } catch (error) {
//     next(error)
//   }
// };


