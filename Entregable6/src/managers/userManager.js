import UserMongooseDao from "../daos/userMongooseDao.js";

class UserManager {
  constructor() {
    this.userDao = new UserMongooseDao();
  }

  verify(user) {
    if (
      user.firstName &&
      user.email &&
      user.age
    ) {
      if (user.password.toString() === 'github') {
        user.password = ''
      }
      return true;
    }
    throw new Error('A user was expected');
  }

  async paginate(req) {
    return await this.userDao.paginate(req);
  }

  async getOneByEmail(email) {
    return await this.userDao.getOneByEmail(email);
  }

  async getOne(id) {
    return await this.userDao.getOne(id);
  }

  async create(data) {
    if (this.verify(data)) {
      const user = await this.userDao.create(data);
      return { ...user, password: undefined };
    }
  }

  async updateOne(id, data) {
    return await this.userDao.updateOne(id, data);
  }

  async deleteOne(id) {
    return await this.userDao.deleteOne(id);
  }

  async forgetPassword(dto) {
    const user = await this.userDao.getOneByEmail(dto.email);
    user.password = dto.password;
    return await this.userDao.updateOne(user.id, user);
  }

}

export default UserManager;
