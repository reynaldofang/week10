const jwt = require("jsonwebtoken");

const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization");

  console.log(token);

  if (!token) {
    return res.status(401).json({ message: "No token provided." });
  }

  jwt.verify(token, "your-secret-key", (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token." });
    }
    req.user = user; // Set the user object in the request for future use
    next();
  });
};

const authorizeRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ message: "Access denied." });
    }
    next();
  };
};

module.exports = {
  authenticateJWT,
  authorizeRole,
};
