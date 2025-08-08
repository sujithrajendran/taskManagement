import { useEffect, useState } from "react";
import axiosInstance from "../Auth/AxiosInstance";
import { CheckCircle, XCircle } from "lucide-react";
import "../css/CreateTask.css";
import { useNavigate } from "react-router-dom";
import { useLoading } from "./LoadingContext";
import socket from "../socket";

const CreateTask = () => {
  const { setIsLoading } = useLoading();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    taskName: "",
    description: "",
    status: "Pending",
    priority: "Medium",
    createdAt: "",
    createdBy: ""
  });

  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);
  const [users, setUsers] = useState<string[]>([]);

  useEffect(() => {
    socket.emit("getRegisteredUser", {});
    socket.on("getRegisteredUser", (response: any) => {
      const allUsers = response.allUsers;
      setUsers(allUsers);
    });

    return () => {
      socket.off("getRegisteredUser");
    };
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const userData = localStorage.getItem("user");
    const token = userData ? JSON.parse(userData).token : null;
    setIsLoading(true);
    socket.emit("createTask", {
      taskData: { ...form },
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    socket.once("createTask", (response: { message: any }) => {
      setIsLoading(false);
      setMessage(response.message || "Task created successfully!");
      setIsSuccess(true);
      setForm({
        taskName: "",
        description: "",
        status: "Pending",
        priority: "Medium",
        createdAt: "",
        createdBy: ""
      });
      navigate("/");
    });

    socket.once("error", (error: { message: any }) => {
      setIsLoading(false);
      setMessage(error.message || "Something went wrong");
      setIsSuccess(false);
    });
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
              max={new Date().toISOString().split("T")[0]}
              onChange={(e) => setForm({ ...form, createdAt: e.target.value })}
              required
            />
          </div>
          <div className="task-form-group">
            <label>Created By</label>
            <select
              value={form.createdBy}
              onChange={(e) => setForm({ ...form, createdBy: e.target.value })}
              required
            >
              <option value="">-- Select User --</option>
              {users.map((user) => (
                <option key={user} value={user}>
                  {user}
                </option>
              ))}
            </select>
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
              <option value="Completed">Completed</option>
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
