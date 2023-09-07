import container from "../../container.js";
import { createHash } from "../../shared/access.js";

class UserManager {
  constructor() {
    this.userRepository = container.resolve('UserRepository');
  }

  verify(user) {
    if (
      user.firstName &&
      user.email &&
      user.age &&
      user.password
    ) {
      return true;
    }
    throw new Error('A user was expected');
  }

  async paginate(req) {
    return await this.userRepository.paginate(req);
  }

  async getOneByEmail(email) {
    const user = await this.userRepository.getOneByEmail(email);
    return { ...user, password: undefined };
  }

  async getOne(id) {
    const user = await this.userRepository.getOne(id);
    return { ...user, password: undefined };
  }

  async create(data) {
    if (this.verify(data)) {
      const userData = {
        ...data,
        password: await createHash(data.password, 10),
      };
      const user = await this.userRepository.create(userData);
      return { ...user, password: undefined };
    }
  }

  async updateOne(id, data) {
    const userData = {
      ...data,
      password: await createHash(data.password, 10),
    };
    const user = await this.userRepository.updateOne(id, userData);
    return { ...user, password: undefined };
  }

  // Ver devolucion de usuario
  async deleteOne(id) {
    return await this.userRepository.deleteOne(id);
  }

// Ver devolucion de usuario
  async forgetPassword(dto) {
    const user = await this.userRepository.getOneByEmail(dto.email);
    user.password = dto.password;
    return await this.userRepository.updateOne(user.id, user);
  }

}

export default UserManager;
