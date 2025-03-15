const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// const userRegistration = async (req, res) => {
//   const { name, email, password, confirmPassword } = req.body;

//   if (!name || !email || !password || !confirmPassword) {
//     return res.status(400).json({ message: "All fields are required" });
//   }

//   if (password !== confirmPassword) {
//     return res.status(400).json({ message: "Passwords do not match" });
//   }

//   try {
//     let userExists = await User.findOne({ email });
//     if (userExists) {
//       return res.status(400).json({ message: "Email already registered" });
//     }

//     const newUser = new User({ name: name, email: email, password: password });
//     await newUser.save();

//     res.status(201).json({ message: "User registered successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

const userRegistration = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  // Validate all required fields
  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check if passwords match
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    // Ensure DB is connected
    await connectDB();

    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const userLogginIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid Email ID" });
    }

    // Compare provided password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET, // Ensure you have JWT_SECRET in your environment variables
      { expiresIn: "12h" } // Token expires in 12 hour
    );

    // Send response with token
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name, // Include other user details if necessary
      },
    });
    console.log("User Login Successful!!");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error occurred while loggin In" });
  }
};

module.exports = { userRegistration, userLogginIn };
