import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
    const token = req.query.accessToken
    // console.log(req.query.accessToken);
    if (!token) {
        return res.status(401).send({ message: "Empty authentication !" });
    }
    jwt.verify(token, process.env.PRIVATE_KEY, (error, data) => {
        if (error) {
            return res.status(403).send({ error: "Authentication error" });
        }
        req.user = data.user;
        next();
    });
};

export default auth;
