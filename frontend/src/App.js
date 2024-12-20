import React from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import LinksPage from "./components/LinksPage";
import "./App.css";

function App() {
  return (
    <div className="container">
      <h1>To-Do List</h1>
      <TaskForm />
      <TaskList />
      <LinksPage />
    </div>
  );
}

export default App;
