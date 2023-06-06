import { PaginationParameters } from "mongoose-paginate-v2";
import userSchema from "./models/userSchema.js";

class UserMongooseDao {
  async paginate(req) {
    const userDocuments = await userSchema.paginate(...new PaginationParameters(req).get());
    userDocuments.docs = userDocuments.docs.map(document => ({
      id: document._id,
      firstName: document.firstName,
      lastName: document.lastName,
      email: document.email,
      age: document.age
    }));
    return userDocuments;
  }

  async getOne(id) {
    const userDocument = await userSchema.findOne({ _id: id });
    if (!userDocument) {
      throw new Error('User not found.')
    }
    return {
      id: userDocument?._id,
      firstName: userDocument?.firstName,
      lastName: userDocument?.lastName,
      email: userDocument?.email,
      age: userDocument?.age,
      password: userDocument?.password
    }
  }

  async getOneByEmail(email) {
    const userDocument = await userSchema.findOne({ email });
    if (!userDocument) {
      throw new Error('User not found.')
    }
    return {
      id: userDocument?._id,
      firstName: userDocument?.firstName,
      lastName: userDocument?.lastName,
      email: userDocument?.email,
      age: userDocument?.age,
      password: userDocument?.password
    }
  }

  async create(data) {
    const userDocument = await userSchema.create(data);
    if (!userDocument) {
      throw new Error('User not created.')
    }
    return {
      id: userDocument._id,
      firstName: userDocument.firstName,
      lastName: userDocument.lastName,
      email: userDocument.email,
      age: userDocument.age,
      password: userDocument.password,
    }
  }

  async updateOne(id, data) {
    const userDocument = await userSchema.findOneAndUpdate({ _id: id }, data, { new: true });
    if (!userDocument) {
      throw new Error('User not found.')
    }
    return {
      id: userDocument._id,
      firstName: userDocument.firstName,
      lastName: userDocument.lastName,
      email: userDocument.email,
      age: userDocument.age,
      password: userDocument.password,
    }
  }

  async deleteOne(id) {
    const result = await userSchema.deleteOne({ _id: id });
    if (!result) {
      throw new Error('User not deleted.')
    }
    return result
  }

}

export default UserMongooseDao;
