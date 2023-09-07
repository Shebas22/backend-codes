import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    req.logger.info("Empty authentication header.");
    return res.status(401).send({ status:"error" , message: "Empty authentication header." });
  }
  const token = authHeader.split(" ")[1]; // Bearer tokenString
  jwt.verify(token, process.env.PRIVATE_KEY, (error, data) => {
    if (error) {
      req.logger.info("Authentication error.");
      return res.status(403).send({ status:"error" , message: "Authentication error." });
    }
    req.user = data.user;
    next();
  });
};

export default auth;
