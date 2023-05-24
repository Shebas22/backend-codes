import UserManager from "./userManager.js";
import bcrypt from "bcrypt";

class SessionManager {
  constructor() {
  }

  async login(req) {
    const { email, password } = req.body;
    const manager = new UserManager();
    if (!email && !password) {
      throw new Error('Login failed, invalid email or password.')
    }
    const user = await manager.getOneByEmail(email);
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      throw new Error('Login failed, invalid email or password.')
    }
    return user;
  }

  async signup(req) {
    const { email, password } = req.body;
    const manager = new UserManager();
    if (!email && !password) {
      throw new Error('Login failed, invalid email or password.')
    }
    const userHash = {
      ...req.body,
      password: await bcrypt.hash(req.body.password, 10),
    };
    return await manager.create(userHash);
  }
}

export default SessionManager;
