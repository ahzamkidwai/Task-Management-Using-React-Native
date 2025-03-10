const express = require("express");
const app = express();

const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Simple Route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
