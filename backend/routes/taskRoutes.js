const express = require("express");
const Task = require("../models/Task");
const router = express.Router();

// Create a new task
router.post("/tasks", async (req, res) => {
  try {
    const { title, description, dueDate, priority, completed } = req.body;
    const newTask = new Task({ title, description, dueDate, priority, completed: completed || false });
    const savedTask = await newTask.save();
    res.json(savedTask);
  } catch (err) {
    res.status(500).send(err.message);
  }
});


// Get all tasks
router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a task
router.put("/tasks/:id", async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a task
router.delete("/tasks/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
