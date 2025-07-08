import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/SearchTask.css";
import { useLoading } from "./LoadingContext";

const SearchTask = () => {
  const { setIsLoading } = useLoading();
  const [title, setTitle] = useState("");
  const [allTasks, setAllTasks] = useState<any[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Fetch tasks on mount
  const fetchTasks = async () => {
    try {
      const userData = localStorage.getItem("user");
      const token = userData ? JSON.parse(userData).token : null;

      setError("");
      // setIsLoading(true);
      const res = await axios.get("https://taskmanagement-backend-xjgy.onrender.com/api/tasks", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setIsLoading(false);
      const data = res.data.tasks || [];
      setAllTasks(data);
      setResults(data);
    } catch {
      setAllTasks([]);
      setResults([]);
      setError("Failed to fetch task(s).");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    if (title.trim() === "") {
      setResults(allTasks);
    } else {
      const filtered = allTasks.filter((task: any) =>
        task.taskName?.toLowerCase().includes(title.toLowerCase())
      );
      setResults(filtered);
    }
  }, [title, allTasks]);

  return (
    <div className="task-container">
      {/* Toolbar */}
      <div className="task-toolbar">
        <div className="input-wrapper stretch" style={{ position: "relative" }}>
          <i className="search-icon">🔍</i>
          <input
            type="text"
            placeholder=""
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="task-input full"
          />

          {title && (
            <span
              className="clear-icon"
              onClick={() => setTitle("")}
              style={{
                position: "absolute",
                right: "-20px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                fontSize: "16px",
                color: "#666"
              }}
            >
              X
            </span>
          )}
        </div>
        <button onClick={() => navigate("/create")} className="task-add-btn">
          ＋
        </button>
      </div>

      {/* Error Message */}
      {error && <div className="task-error">{error}</div>}

      {/* Task Table */}
      {results.length > 0 ? (
        <div className="task-table-wrapper">
          <table className="task-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Status</th>
                <th>Created At</th>
                <th>Created By</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              {results.map((task: any) => (
                <tr
                  key={task.taskId}
                  onClick={() => navigate(`/task/${task.taskId}`)}
                  className="clickable-row"
                >
                  <td>{task.taskId}</td>
                  <td>{task.taskName}</td>
                  <td className="capitalize">{task.status}</td>
                  <td>{task.createdAt}</td>
                  <td>{task.createdBy}</td>
                  <td>{task.priority}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !error && <p className="task-empty">No tasks to display.</p>
      )}
    </div>
  );
};

export default SearchTask;
