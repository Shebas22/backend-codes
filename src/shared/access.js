import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createHash = async (password) => {
  console.log(password);
  return await bcrypt.hash(password, 10);
};

export const isValidPassword = async (password, passwordHash) => {
  return await bcrypt.compare(password, passwordHash);
};

export const generateToken = async (user) => {
  return new Promise((resolve, reject) => {
    const token = jwt.sign(
      { user: { ...user, password: undefined, carts: undefined } },
      process.env.PRIVATE_KEY,
      { expiresIn: 60 }
    );
    resolve(token);
  });
};
