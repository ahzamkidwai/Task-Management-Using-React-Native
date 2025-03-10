const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const app = express();
const cors = require("cors");

const PORT = 3000;

// Load environment variables
dotenv.config();

connectDB();

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors());

// Simple Route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
