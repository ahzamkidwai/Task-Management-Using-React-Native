const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const AuthToken = req.header("Authorization");
  const token = AuthToken.split(" ")[1].trim(); // Extract token
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access Denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user data to request
    console.log("Token is : ", token);
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or Expired Token" });
  }
};

module.exports = authMiddleware;
