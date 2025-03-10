const Task = require("../models/Task");

const createTask = async (req, res) => {
  try {
    console.log("Welcome to Create Task");
    const { title, description, dueDate } = req.body;

    console.log("Title is:", title);
    console.log("Description is:", description);
    console.log("Due Date is:", dueDate);

    if (!title) return res.status(400).json({ message: "Title is required" });
    if (!description)
      return res.status(400).json({ message: "Description is required" });
    if (!dueDate)
      return res.status(400).json({ message: "Due Date is required" });

    const task = new Task({
      title,
      description,
      dueDate,
      userId: req.user.userId,
    });
    await task.save();

    res.status(201).json({ message: "Task created", task });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    console.log("Welcome to Update Task");
    const { id } = req.params;
    const { title, description, dueDate } = req.body;

    console.log("Task ID is:", id);
    console.log("Updated Title:", title);
    console.log("Updated Description:", description);
    console.log("Updated Due Date:", dueDate);

    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.userId.toString() !== req.user.userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this task" });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.dueDate = dueDate || task.dueDate;

    await task.save();

    res.status(200).json({ message: "Task updated successfully", task });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const getTaskById = async (req, res) => {
  try {
    console.log("Welcome to Get Task");
    const { id } = req.params;

    console.log("Fetching Task ID:", id);

    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.userId.toString() !== req.user.userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized to view this task" });
    }

    res.status(200).json({ message: "Task fetched successfully", task });
  } catch (error) {
    console.error("Error fetching task:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const getAllTasks = async (req, res) => {
  try {
    console.log("Welcome to Get All Tasks");
    const userId = req.user.userId;

    console.log("Fetching tasks for user ID:", userId);

    const tasks = await Task.find({ userId });

    res.status(200).json({ message: "Tasks fetched successfully", tasks });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    console.log(`Deleting task with ID: ${id}`);

    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully", deletedTask });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = {
  createTask,
  updateTask,
  getTaskById,
  getAllTasks,
  deleteTask,
};
