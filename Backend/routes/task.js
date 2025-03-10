const express = require("express");
const {
  createTask,
  updateTask,
  getTaskById,
  getAllTasks,
  deleteTask,
} = require("../controllers/task-controller");
const authMiddleware = require("../middlewares/auth-middleware");
const router = express.Router();

router.post("/createTask", authMiddleware, createTask);
router.put("/updateTask/:id", authMiddleware, updateTask);
router.get("/getTask/:id", authMiddleware, getTaskById);
router.get("/getAllTasks", authMiddleware, getAllTasks);
router.delete("/deleteTask/:id", authMiddleware, deleteTask);

module.exports = router;
