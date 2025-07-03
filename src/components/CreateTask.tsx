import { useState } from "react";
import axios from "axios";
import { CheckCircle, XCircle } from "lucide-react";
import "../css/CreateTask.css";
import { useNavigate } from "react-router-dom";

const CreateTask = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    taskName: "",
    description: "",
    status: "pending",
    priority: "Medium",
    createdAt: "",
    createdBy: ""
  });

  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://taskmanagement-backend-xjgy.onrender.com/api/tasks",
        form
      );
      setMessage(response.data.message);
      setIsSuccess(true);
      setForm({
        taskName: "",
        description: "",
        status: "pending",
        priority: "Medium",
        createdAt: "",
        createdBy: ""
      });
      navigate("/");
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Task Name is already present";
      setMessage(errorMessage);
      setIsSuccess(false);
    }
  };

  return (
    <div className="task-container">
      <div className="task-toolbar">
        <h2 className="task-heading">Create New Task</h2>
      </div>

      <div className="task-form-wrapper">
        <form onSubmit={handleSubmit} className="task-form">
          <div className="task-form-group">
            <label>TaskName</label>
            <input
              type="text"
              value={form.taskName}
              onChange={(e) => setForm({ ...form, taskName: e.target.value })}
              required
            />
          </div>

          <div className="task-form-group">
            <label>Description</label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </div>

          <div className="task-form-group">
            <label>Created At</label>
            <input
              type="date"
              value={form.createdAt}
              onChange={(e) => setForm({ ...form, createdAt: e.target.value })}
              required
            />
          </div>
          <div className="task-form-group">
            <label>Created By</label>
            <input
              type="string"
              value={form.createdBy}
              onChange={(e) => setForm({ ...form, createdBy: e.target.value })}
              required
            />
          </div>

          <div className="task-form-group">
            <label>Status</label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <option value="started">Started</option>
              <option value="inProgress">In-Progress</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="task-form-group">
            <label>Priority</label>
            <select
              value={form.priority}
              onChange={(e) => setForm({ ...form, priority: e.target.value })}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <button type="submit" className="task-submit-btn">
            Create Task
          </button>
        </form>

        {message && (
          <div className={`task-alert ${isSuccess ? "success" : "error"}`}>
            {isSuccess ? <CheckCircle size={20} /> : <XCircle size={20} />}
            <span>{message}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateTask;
