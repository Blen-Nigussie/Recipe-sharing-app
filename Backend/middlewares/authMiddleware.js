
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;
  
  if (req.headers.authorization?.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log(" Verifying token:", token.substring(0, 20) + "...");
      
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("✅ Token verified, user ID:", decoded.id);
      
      req.user = await User.findById(decoded.id).select("-password");
      if (!req.user) {
        console.log(" User not found in database for token");
        return res.status(401).json({ message: "User not found" });
      }
      
      console.log("👤 User authenticated:", { _id: req.user._id, name: req.user.name });
      next();
    } catch (err) {
      console.error(" JWT verification failed:", err.message);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    console.log(" No Bearer token found in headers");
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = {protect};
