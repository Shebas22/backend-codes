import UserManager from "../managers/userManager.js";

export const list = async (req, res) => {
  const manager = new UserManager();
  const users = await manager.paginate(req);
  if (!users) {
    return res.status(401).send({
      status: "error",
      message: "No users found.",
    });
  }
  return res
    .status(200)
    .json({ status: "success", users: users.docs, ...users, docs: undefined });
};

export const getOne = async (req, res) => {
  const { id } = req.params;
  const manager = new UserManager();
  const user = await manager.getOne(id);
  if (!user) {
    return res.status(401).send({
      status: "error",
      message: "No user found.",
    });
  }
  return res.status(200).json({ status: "success", user });
};

export const save = async (req, res) => {
  const manager = new UserManager();
  const user = await manager.create(req.body);
  if (!user) {
    return res.status(401).send({
      status: "error",
      message: "User not created.",
    });
  }
  return res.status(200).json({ status: "success", message: "User created." });
};

export const update = async (req, res) => {
  const { id } = req.params;

  const manager = new UserManager();
  const result = await manager.updateOne(id, req.body);
  if (!user) {
    return res.status(401).send({
      status: "error",
      message: "User not update.",
    });
  }
  return res
    .status(200)
    .json({ status: "success", result, message: "User updated." });
};

export const deleteOne = async (req, res) => {
  const { id } = req.params;

  const manager = new UserManager();
  const user = await manager.deleteOne(id);
  if (!user) {
    return res.status(401).send({
      status: "error",
      message: "User not delete.",
    });
  }
  return res
    .status(200)
    .json({ status: "success", user, message: "User deleted." });
};
