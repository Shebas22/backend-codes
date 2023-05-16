import UserManager from "./userManager.js";
import bcrypt from "bcrypt";

const manager = new UserManager();

class SessionManager {
  constructor() {
  }

  async login(email, password) {

    if (!email && !password) {
      return false;
    }

    const user = await manager.getOneByEmail(email);
    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword) {
      return false;
    }
    return user;
  }

  async signup(req) {
    const userHash = {
      ...req.body,
      password: await bcrypt.hash(req.body.password, 10),
    };

    const user = await manager.create(userHash);
    if (!user) {
      return false;
    }
    return user;
  }
}

export default SessionManager;
