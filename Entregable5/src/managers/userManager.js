import UserMongooseDao from "../daos/userMongooseDao.js";

class UserManager
{
  constructor()
  {
     this.userDao = new UserMongooseDao();
  }

  verify(user) {
    return (
      user.firstName &&
      user.email &&
      user.age &&
      user.password
    );
  }

  async paginate(req)
  {
    return this.userDao.paginate(req);
  }

  async getOneByEmail(email)
  {
    return this.userDao.getOneByEmail(email);
  }

  async getOne(id)
  {
    return this.userDao.getOne(id);
  }

  async create(data)
  {
    if (this.verify(data)) {
      const user = await this.userDao.create(data);
      return { ...user, password: undefined };
    }
  }

  async updateOne(id, data)
  {
    return this.userDao.updateOne(id, data);
  }

  async deleteOne(id)
  {
    return this.userDao.deleteOne(id);
  }
}

export default UserManager;
