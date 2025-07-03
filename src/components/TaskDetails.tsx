import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/CreateTask.css";

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState<any>(null);
  const [error, setError] = useState("");

  const fetchTask = async () => {
    try {
      const res = await axios.get(`http://taskmanagement-backend-xjgy.onrender.com/api/tasks/${id}`);
      setTask(res.data.task[0]);
    } catch {
      setError("Task not found");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      await axios.delete(`http://localhost:4000/api/tasks/${id}`);
      navigate("/");
    }
  };

  useEffect(() => {
    fetchTask();
  }, []);

  if (error) return <div>{error}</div>;
  if (!task) return <div>Loading...</div>;

 return (
  <div className="task-container">
    <div className="task-toolbar">
      <h2 className="task-heading">Task Details</h2>
    </div>

    <div className="task-form-wrapper">
      <div className="task-form task-view">
        <div className="task-form-group">
          <label>Task Name</label>
          <input type="text" value={task.taskName} disabled />
        </div>

        <div className="task-form-group">
          <label>Status</label>
          <input type="text" value={task.status} disabled />
        </div>

        <div className="task-form-group">
          <label>Description</label>
          <textarea value={task.description} disabled rows={3} />
        </div>

        <div className="task-form-group">
          <label>Created At</label>
          <input
            type="text"
            value={new Date(task.createdAt).toLocaleString()}
            disabled
          />
        </div>

        <div className="task-form-group">
          <label>Created By</label>
          <input type="text" value={task.createdBy} disabled />
        </div>

        <div className="task-form-group">
          <label>Priority</label>
          <input type="text" value={task.priority} disabled />
        </div>

        <div className="task-btn-group">
          <button
            onClick={() => navigate(`/edit/${id}`)}
            className="task-submit-btn"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="task-submit-btn danger"
            style={{ marginLeft: "10px" }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
);
};

export default TaskDetails;
