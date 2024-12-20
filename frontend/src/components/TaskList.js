import React, { useEffect, useState } from "react";
import axios from "axios";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [editFormData, setEditFormData] = useState({ title: "", description: "" });

  // Fetch tasks from the API
  useEffect(() => {
    const fetchTasks = async () => {
      const res = await axios.get("http://localhost:5000/api/tasks");
      setTasks(res.data);
    };
    fetchTasks();
  }, []);

  // Delete a task
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`);
    setTasks(tasks.filter((task) => task._id !== id));
  };

  // Toggle task completion
  const handleToggleComplete = async (id, completed) => {
    await axios.put(`http://localhost:5000/api/tasks/${id}`, { completed: !completed });
    setTasks(tasks.map((task) =>
      task._id === id ? { ...task, completed: !completed } : task
    ));
  };

  // Start editing a task
  const handleEditClick = (task) => {
    setEditingTask(task._id);
    setEditFormData({ title: task.title, description: task.description });
  };

  // Save edited task
  const handleEditSave = async (id) => {
    await axios.put(`http://localhost:5000/api/tasks/${id}`, editFormData);
    setTasks(tasks.map((task) =>
      task._id === id ? { ...task, ...editFormData } : task
    ));
    setEditingTask(null);
  };

  // Determine task priority color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "#f8d7da"; // Light red
      case "Medium":
        return "#fff3cd"; // Light yellow
      case "Low":
        return "#d4edda"; // Light green
      default:
        return "#ffffff"; // White
    }
  };

  // Filter tasks by search input
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Task List</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          marginBottom: "10px",
          padding: "8px",
          width: "100%",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      />

      {/* Task List */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {filteredTasks.map((task) => {
          const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;

          return (
            <li
              key={task._id}
              style={{
                backgroundColor: getPriorityColor(task.priority),
                textDecoration: task.completed ? "line-through" : "none",
                marginBottom: "10px",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            >
              {editingTask === task._id ? (
                // Edit Form
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleEditSave(task._id);
                  }}
                >
                  <input
                    type="text"
                    value={editFormData.title}
                    onChange={(e) =>
                      setEditFormData({ ...editFormData, title: e.target.value })
                    }
                    placeholder="Edit title"
                    style={{ marginRight: "5px", padding: "5px" }}
                  />
                  <input
                    type="text"
                    value={editFormData.description}
                    onChange={(e) =>
                      setEditFormData({ ...editFormData, description: e.target.value })
                    }
                    placeholder="Edit description"
                    style={{ marginRight: "5px", padding: "5px" }}
                  />
                  <button type="submit" style={{ marginRight: "5px" }}>Save</button>
                  <button
                    onClick={() => setEditingTask(null)}
                    style={{ backgroundColor: "#f44336", color: "white" }}
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                // Task Display
                <>
                  <div>
                    <strong>{task.title}</strong> - {task.description}{" "}
                    {task.dueDate && (
                      <span>
                        | Due: {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                    )}
                    {isOverdue && (
                      <span style={{ color: "red", marginLeft: "10px" }}> (Overdue)</span>
                    )}
                  </div>
                  <div style={{ marginTop: "5px" }}>
                    <button
                      style={{ marginRight: "5px" }}
                      onClick={() => handleToggleComplete(task._id, task.completed)}
                    >
                      {task.completed ? "Undo" : "Complete"}
                    </button>
                    <button
                      style={{ marginRight: "5px" }}
                      onClick={() => handleEditClick(task)}
                    >
                      Edit
                    </button>
                    <button
                      style={{ backgroundColor: "#f44336", color: "white" }}
                      onClick={() => handleDelete(task._id)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TaskList;
