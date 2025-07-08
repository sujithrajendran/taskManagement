import { useState } from "react";
import axios from "axios";

const DeleteTask = () => {
  const [id, setId] = useState("");
  const [message, setMessage] = useState("");

  const handleDelete = async () => {
    try {
      const userData = localStorage.getItem("user");
      const token = userData ? JSON.parse(userData).token : null;
      await axios.delete(`https://taskmanagement-backend-xjgy.onrender.com/api/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMessage("Task deleted");
    } catch {
      setMessage("Failed to delete task");
    }
  };

  return (
    <div>
      <h2>Delete Task</h2>
      <input
        placeholder="Enter task ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <button onClick={handleDelete}>Delete</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default DeleteTask;
