const jwt = require("jsonwebtoken");
const User = require("../models/users");
const Shelter = require("../models/shelters");
const {
  loginSchema,
  registerSchema,
  sheltersRegisterSchema,
} = require("../validators/validator");
const { doHash, doHashValidation } = require("../utils/hashing");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { error } = loginSchema.validate({ email, password });
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    // Simulating a database call to find the user
    const user = await User.findOne({ email }).select("+password"); // Ensure password is included in the result
    if (!user) {
      return res.status(401).json({ message: "User does not exist" });
    }
    const result = await doHashValidation(password, user.password);
    if (!result) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    // Simulating a successful login response

    const accessToken = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    user.refreshToken = refreshToken;
    await user.save();

    res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({
        message: "Login successful",
        accessToken,
        user: { email: user.email, role: user.role },
      });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.refresh = async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user || user.refreshToken !== token) {
      return res.sendStatus(403);
    }

    const newAccessToken = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    res.sendStatus(403);
  }
};

exports.register = async (req, res) => {
  const { name, email, password, phone, address, role } = req.body;

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
      role: role || "adopters", // Default role
    });

    await newUser.save();
    res
      .status(201)
      .json({ message: "User registered successfully", user: { email } });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.logout = async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.sendStatus(204); // No content

  const user = await User.findOne({ refreshToken: token });
  if (user) {
    user.refreshToken = null;
    await user.save();
  }

  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });
  res.status(200).json({ message: "Logout successful" });
};

exports.registerShelter = async (req, res) => {
  const { companyName, companyEmail, phone, address, business_license } =
    req.body;

  try {
    // Validate the request body
    const { error } = sheltersRegisterSchema.validate({
      companyName,
      companyEmail,
      phone,
      address,
      business_license,
    });
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Check if shelter already exists
    const existingShelter = await Shelter.findOne({ companyEmail });
    if (existingShelter) {
      return res.status(409).json({ message: "Shelter already exists" });
    }

    // Create a new shelter
    const newShelter = new Shelter({
      companyName,
      companyEmail,
      phone,
      address,
      business_license,
      created_by_userid: req.user.userId, // Assuming req.user is set by auth middleware
    });

    await newShelter.save();
    //Update the shelter manager to associate with the shelter
    await associateUserWithShelter(req.user.userId, newShelter._id);

    res.status(201).json({
      message: "Shelter registered successfully",
      shelter: { companyEmail },
    });
  } catch (error) {
    console.error("Shelter registration error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

async function associateUserWithShelter(userId, shelterId) {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");
  user.shelter_id = shelterId;
  await user.save();
}

exports.createStaff = async (req, res) => {
  const { name, email, password, phone, address } = req.body;
  try {
    // Validate the request body
    const { error } = registerSchema.validate({ email, password });
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await doHash(password, 12); // Hash the password
    // Create a new user with shelter staff role
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const manager = await User.findById(req.user.userId);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      role: "shelter_staff", // Set role to shelter staff
      shelter_id: manager.shelter_id, // Associate with the shelter
    });

    await newUser.save();
    res.status(201).json({
      message: "Shelter staff registered successfully",
      user: { email },
    });
  } catch (error) {
    console.error("Shelter staff registration error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
