const jwt = require("jsonwebtoken");
const { JWT_SIGN } = require("../config/jwt.js");

const autoMiddleware = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }
  try {
    const decoded = jwt.verify(token, JWT_SIGN);
    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = autoMiddleware;
