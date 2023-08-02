import UserManager from "../../domain/managers/userManager.js";
import idValidation from "../../domain/validations/shared/idValidation.js";

export const list = async (req, res, next) => {
  const manager = new UserManager();
  try {
    const users = await manager.paginate(req);
    return res.status(200).json({ status: "success", users: users.docs, ...users, docs: undefined });
  } catch (error) {
    next(error)
  }
};

export const getOne = async (req, res, next) => {
  const manager = new UserManager();
  try {
    await idValidation.parseAsync(req.params);
    const { id } = req.params;
    const user = await manager.getOne(id);
    return res.status(200).json({ status: "success", user });
  } catch (error) {
    next(error)
  }
};

export const save = async (req, res, next) => {
  const manager = new UserManager();
  try {
    const user = await manager.create(req.body);
    return res.status(201).json({ status: "success", message: "User created." });
  } catch (error) {
    next(error)
  }
};

export const update = async (req, res, next) => {
  const manager = new UserManager();
  try {
    await idValidation.parseAsync(req.params);
    const { id } = req.params;
    const result = await manager.updateOne(id, req.body);
    return res.status(201).json({ status: "success", result, message: "User updated." });
  } catch (error) {
    next(error)
  }
};

export const deleteOne = async (req, res, next) => {
  const manager = new UserManager();
  try {
    await idValidation.parseAsync(req.params);
    const { id } = req.params;
    const user = await manager.deleteOne(id);
    return res.status(201).json({ status: "success", user, message: "User deleted." });
  } catch (error) {
    next(error)
  }
};
