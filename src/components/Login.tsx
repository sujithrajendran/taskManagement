import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CheckCircle, XCircle } from "lucide-react";
import "../css/CreateTask.css"; // Shared style for consistent layout

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post(
        "https://taskmanagement-backend-xjgy.onrender.com/api/tasks/login",
        form
      );

      if (res.data?.token) {
        localStorage.setItem("user", JSON.stringify({ token: res.data.token }));
        setIsSuccess(true);
        navigate("/");
      } else {
        setIsSuccess(false);
        setMessage("Invalid email or password");
      }
    } catch (err: any) {
      setIsSuccess(false);
      setMessage(
        err.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin} className="auth-form">
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          <button type="submit">Login</button>
          <p className="auth-link" onClick={() => navigate("/signup")}>
            Don&apos;t have an account? Sign up
          </p>
          {message && <div className="task-alert error">{message}</div>}
        </form>
      </div>
    </div>
  );
};

export default Login;
