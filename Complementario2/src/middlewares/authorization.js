
const authorization = (permission) =>
{
    return async(req, res, next) =>
    {
        const user = req.user;
        console.log(user.isRoot);
        console.log(user.role?.permissions);
        if(!user.isRoot && !user.role?.permissions.includes(permission))
        {
            return res.status(401).send({ status: 'error', message: 'Not authorization!'});
        }
        next();
    }
}

export default authorization;