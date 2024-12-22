import React from "react";

const LinksPage = () => {
  const handleViewTasks = () => {
    window.open("http://localhost:5000/api/tasks", "_blank");
  };


  return (
    <div style={styles.container}>
      <h3 style={styles.header}>Test REST API Endpoint</h3>
      <button style={styles.button} onClick={handleViewTasks}>
        View All Tasks
      </button>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    marginTop: "20px",
    marginBottom: "20px",
  },
  header: {
    fontSize: "20px",
    fontWeight: "600",
    marginBottom: "10px",
    color: "#333",
  },
  button: {
    backgroundColor: "#2196F3",
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "10px 20px",
    cursor: "pointer",
    fontSize: "16px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    transition: "background-color 0.3s ease",
  },
  buttonHover: {
    backgroundColor: "#1976D2",
  },
};

export default LinksPage;

