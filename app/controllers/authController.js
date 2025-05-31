const jwt = require('jsonwebtoken');
const User = require('../models/users'); 
const {loginSchema, registerSchema} = require('../middleware/validator');
const { doHash, doHashValidation } = require('../utils/hashing');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { error } = loginSchema.validate({ email, password });
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    // Simulating a database call to find the user
    const user = await User.findOne({ email }).select('+password'); // Ensure password is included in the result
    if (!user) {
      return res.status(401).json({ message: "User does not exist" });
    }
    const result = await doHashValidation(password, user.password);
    if (!result) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    // Simulating a successful login response
    const token = jwt.sign(
        { userId: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '8h' } // Token expires in 8 hour
    );
    res.cookie('Authorization', 'Bearer' + token, { expires: new Date(Date.now() + 3600000), httpOnly: process.env.NODE_ENV === "production", secure: process.env.NODE_ENV === "production" })
    .json({ message: "Login successful", token, user: { email: user.email, role: user.role } });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.register = async (req, res) => {
  const { name, email, password, phone, address } = req.body;

  try {
    // Validate the request body
    const { error, value } = registerSchema.validate({ email, password });
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await doHash(password, 12); // In a real application, you should hash the password here
    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      role: 'adopters', // Default role
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully", user: { email } });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}