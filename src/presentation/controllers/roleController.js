import RoleManager from "../../domain/managers/roleManager.js";

export const list = async  (req, res, next) =>
{
  try
  {
    const { limit, page } = req.query;
    const manager = new RoleManager();
    const roles = await manager.paginate({ limit, page });
    req.logger.info("List roles.");
    res.status(200).json({ status: 'success', roles: roles.docs, ...roles, docs: undefined });
  }
  catch (e)
  {
		next(e);
	}
};

export const getOne = async (req, res, next) =>
{
  try
  {
    const { id } = req.params;
    const manager = new RoleManager();
    const role = await manager.getOne(id);
    req.logger.info("Role found.");
    res.status(200).json({ status: 'success', role });
  }
  catch (e)
  {
		next(e);
	}
};

export const save = async (req, res, next) =>
{
  try
  {
    const manager = new RoleManager();
    const role = await manager.create(req.body);
    req.logger.info("Role created.");
    res.status(201).json({ status: 'success', role, message: 'Role created.' });
  }
  catch (e)
  {
		next(e);
	}
};

export const update = async (req, res, next) =>
{
  try
  {
    const { id } = req.params;
    const manager = new RoleManager();
    const result = await manager.updateOne(id, req.body);
    req.logger.info("Role updated.");
    res.status(201).json({ status: 'success', result, message: 'Role updated.' });
  }
  catch (e)
  {
		next(e);
	}
};

export const deleteOne = async (req, res, next) =>
{
  try
  {
    const { id } = req.params;
    const manager = new RoleManager();
    await manager.deleteOne(id);
    req.logger.info("Role deleted.");
    res.status(201).json({ status: 'success', message: 'Role deleted.' });
  }
  catch (e)
  {
		next(e);
	}
};