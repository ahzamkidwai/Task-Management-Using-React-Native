// const mongoose = require("mongoose");

// const connectDB = async () => {
//   try {
//     mongoose
//       .connect(process.env.MONGODB_URI, {
//         // useNewUrlParser: true,
//         // useUnifiedTopology: true,
//       })
//       .then(() => console.log("MongoDB connected successfully"))
//       .catch((err) => console.error("MongoDB connection error:", err));
//     console.log("MongoDB Connected!");
//   } catch (error) {
//     console.error("MongoDB Connection Failed!", error);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed!", error);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
