import userSchema from "./models/userSchema.js";

class UserMongooseDao
{
  async paginate(req)
  {
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

  async getOne(id)
  {
    const userDocument = await userSchema.findOne({ _id: id });

    if(!userDocument)
    {
      return false
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

  async getOneByEmail(email)
  {
    const userDocument = await userSchema.findOne({ email });

    if(!userDocument)
    {
      return false
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

  async create(data)
  {
    const userDocument = await userSchema.create(data);

    return {
        id: userDocument._id,
        firstName: userDocument.firstName,
        lastName: userDocument.lastName,
        email: userDocument.email,
        age: userDocument.age,
        password: userDocument.password,
    }
  }

  async updateOne(id, data)
  {
    const userDocument = await userSchema.findOneAndUpdate({ _id: id }, data, { new: true});

    if(!userDocument)
    {
      return false
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

  async deleteOne(id)
  {
    return userSchema.deleteOne({ _id: id });
  }
}

export default UserMongooseDao;