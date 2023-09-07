
const authorization = (permission) =>
{
    return async(req, res, next) =>
    {
        const user = req.user;
        if(!user.isRoot && !user.role?.permissions.includes(permission))
        {
            req.logger.info("Not authorization.");
            return res.status(401).send({ status: 'error', message: 'Not authorization.'});
        }
        next();
    }
}

export default authorization;