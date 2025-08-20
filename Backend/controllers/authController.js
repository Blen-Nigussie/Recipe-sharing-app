const User = require("../models/User");
const generateToken = require("../utils/generateToken");

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("Register attempt:", { name, email, hasPassword: !!password });
    
    if (await User.findOne({ email })) {
      console.log("Email already exists:", email);
      return res.status(400).json({ message: "Email already exists" });
    }

    const user = await User.create({ name, email, password });
    console.log("User created:", { _id: user._id, name: user.name, email: user.email });
    
    const response = { 
      token: generateToken(user._id),
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    };
    
    console.log("Sending response:", response);
    res.status(201).json(response);
  } catch (error) {
    console.error(" Register error:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(" Login attempt:", { email, hasPassword: !!password });
    
    const user = await User.findOne({ email });
    if (!user) {
      console.log(" User not found:", email);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.matchPassword(password);
    console.log(" Password match:", isMatch);
    
    if (!isMatch) {
      console.log(" Password mismatch for user:", email);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const response = { 
      token: generateToken(user._id),
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    };
    
    console.log(" Login successful:", { _id: user._id, name: user.name, email: user.email });
    console.log(" Sending response:", response);
    res.json(response);
  } catch (error) {
    console.error(" Login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};

exports.getProfile = async (req, res) => {
  try {
    console.log("Profile request for user:", req.user._id);
    
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      console.log("User not found in database:", req.user._id);
      return res.status(404).json({ message: "User not found" });
    }
    
    console.log("Profile found:", { _id: user._id, name: user.name, email: user.email });
    res.json(user);
  } catch (error) {
    console.error("Error getting profile:", error);
    res.status(500).json({ message: "Server error getting profile" });
  }
};
