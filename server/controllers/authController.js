const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createUser, findUserByEmail } = require("../models/userModel");

const SECRET = "your_jwt_secret";

// REGISTER USER
const registerUser = async (req, res) => {
  const { first_name, last_name, gender, role, email, password } = req.body;

  // Basic validation
  if (!first_name || !last_name || !gender || !role || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if user exists
    const existingUser = await findUserByEmail(email);
    if (existingUser.length > 0) {
      return res.status(409).json({ message: "User already exists with this email" });
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    await createUser({
      first_name,
      last_name,
      gender,
      role,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({ message: " 👏You registered successfully. Login Now" });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// LOGIN USER
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(" Login attempt with:", req.body);

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const users = await findUserByEmail(email);
    if (users.length === 0) {
      console.log(" User not found");
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = users[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Password mismatch");
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      SECRET,
      { expiresIn: "1d" }
    );

    console.log(" Login successful");
    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role,
        profile_picture: user.profile_picture || null,

      },
    });
  } catch (error) {
    console.error(" Login error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { registerUser, loginUser };
