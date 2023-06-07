import UserMongooseDao from "../daos/userMongooseDao.js";
import { createHash } from "../shared/access.js";

class UserManager {
  constructor() {
    this.userDao = new UserMongooseDao();
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
    return await this.userDao.paginate(req);
  }

  async getOneByEmail(email) {
    const user = await this.userDao.getOneByEmail(email);
    return { ...user, password: undefined };
  }

  async getOne(id) {
    const user = await this.userDao.getOne(id);
    return { ...user, password: undefined };
  }

  async create(data) {
    if (this.verify(data)) {
      const userData = {
        ...data,
        password: await createHash(data.password, 10),
      };
      const user = await this.userDao.create(userData);
      return { ...user, password: undefined };
    }
  }

  async updateOne(id, data) {
    const user = await this.userDao.updateOne(id, data);
    return { ...user, password: undefined };
  }

  // Ver devolucion de usuario
  async deleteOne(id) {
    return await this.userDao.deleteOne(id);
  }

// Ver devolucion de usuario
  async forgetPassword(dto) {
    const user = await this.userDao.getOneByEmail(dto.email);
    user.password = dto.password;
    return await this.userDao.updateOne(user.id, user);
  }

}

export default UserManager;
