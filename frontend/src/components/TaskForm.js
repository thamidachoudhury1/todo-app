import React, { useState } from "react";
import axios from "axios";

const TaskForm = () => {
  const [task, setTask] = useState({ title: "", description: "", dueDate: "", priority: "Low" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/tasks", task);
    window.location.reload();
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Title"
        onChange={(e) => setTask({ ...task, title: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Description"
        onChange={(e) => setTask({ ...task, description: e.target.value })}
      />
      <input
        type="date"
        onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
      />
      <select onChange={(e) => setTask({ ...task, priority: e.target.value })}>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <button type="submit" style={{ backgroundColor: "#4CAF50", color: "white" }}>Add Task</button>
    </form>
  );
};

export default TaskForm;

