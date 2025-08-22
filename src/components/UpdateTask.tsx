import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { CheckCircle, XCircle } from "lucide-react";
import "../css/CreateTask.css";
import { useLoading } from "./LoadingContext";

const UpdateTask = () => {
  const { setIsLoading } = useLoading();
  const navigate = useNavigate();
  const { id: taskId } = useParams();
  const [form, setForm] = useState({
    taskName: "",
    description: "",
    status: "pending",
    priority: "Medium",
    createdAt: "",
    createdBy: ""
  });

  const [initialForm, setInitialForm] = useState(form);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        setIsLoading(true);
        const userData = localStorage.getItem("user");
        const token = userData ? JSON.parse(userData).token : null;

        const res = await axios.get(
          `https://taskmanagement-backend-xjgy.onrender.com/api/tasks/${taskId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setIsLoading(false);
        const task = res.data.task[0];
        const newForm = {
          taskName: task.taskName || "",
          description: task.description || "",
          status: task.status,
          priority: task.priority,
          createdAt: task.createdAt || "",
          createdBy: task.createdBy || ""
        };
        setForm(newForm);
        setInitialForm(newForm);
      } catch {
        setIsLoading(false);
        setMessage("Failed to fetch task");
        setIsSuccess(false);
      }
    };

    if (taskId) fetchTask();
  }, [taskId]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const userData = localStorage.getItem("user");
      const token = userData ? JSON.parse(userData).token : null;
      await axios.put(`https://taskmanagement-backend-xjgy.onrender.com/api/tasks/${taskId}`, form, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setIsLoading(false);
      setMessage("Task updated successfully!");
      setIsSuccess(true);
      navigate("/");
    } catch {
      setMessage("Failed to update task");
      setIsSuccess(false);
    }
  };

  const isFormChanged = JSON.stringify(form) !== JSON.stringify(initialForm);

  return (
    <div className="task-container">
      <div className="task-toolbar">
        <h2 className="task-heading">Update Task</h2>
      </div>

      <div className="task-form-wrapper">
        <form onSubmit={handleUpdate} className="task-form">
          <div className="task-form-group">
            <label>Task Name</label>
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
            <label>Status</label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <option value="Started">Started</option>
              <option value="In-Progress">In-Progress</option>
              <option value="Pending">Pending</option>
              <option value="Closed">Closed</option>
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

          {form.createdAt && (
            <div className="task-form-group">
              <label>Created At</label>
              <input
                type="text"
                value={new Date(form.createdAt).toLocaleString()}
                disabled
                className="bg-gray-100 cursor-not-allowed"
              />
            </div>
          )}

          {form.createdBy && (
            <div className="task-form-group">
              <label>Created By</label>
              <input
                type="text"
                value={form.createdBy}
                disabled
                className="bg-gray-100 cursor-not-allowed"
              />
            </div>
          )}

          <button
            type="submit"
            className="task-submit-btn"
            disabled={!isFormChanged}
            style={{
              opacity: isFormChanged ? 1 : 0.5,
              cursor: isFormChanged ? "pointer" : "not-allowed"
            }}
          >
            Update Task
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

export default UpdateTask;

