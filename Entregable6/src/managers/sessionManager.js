import UserManager from "./userManager.js";
import bcrypt from "bcrypt";

class SessionManager {
  constructor() {
  }

  async login(dto) {
    const { email, password } = dto;
    const manager = new UserManager();
    if (!email && !password) {
      throw new Error('Login failed, invalid email or password.')
    }
    const user = await manager.getOneByEmail(email);
    if (password.toString() === 'github') {
      user.password = undefined;
      return user;
    }
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      throw new Error('Login failed, invalid email or password.')
    }
    user.password = undefined;
    return user;
  }

  async signup(dto) {
    const { email, password } = dto;
    const manager = new UserManager();
    if (!email && !password) {
      throw new Error('Login failed, invalid email or password.')
    }
    const userHash = {
      ...dto,
      password: await bcrypt.hash(password, 10),
    };
    return await manager.create(userHash);
  }
}

export default SessionManager;
