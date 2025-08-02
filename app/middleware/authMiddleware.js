const jwt = require("jsonwebtoken");
const User = require("../models/users");

exports.authMiddleware = (req, res, next) => {
  // Check if the request is authenticated using Passport.js
  // This is useful if you are using Passport.js for authentication
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }
  
  // If not using Passport.js, check for JWT in headers or cookies
  const authHeader = req.headers.authorization || req.cookies.Authorization;
  const token = authHeader && authHeader.split(" ")[1]; // Extract token from Bearer scheme
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { userId, email, role }
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};

exports.roleMiddleware = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};

