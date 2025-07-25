import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLoading } from "./LoadingContext";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import "../css/CreateTask.css";

const Login = () => {
  const { setIsLoading } = useLoading();
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    try {
      setIsLoading(true);
      const res = await axios.post(
        "https://taskmanagement-backend-xjgy.onrender.com/api/tasks/login",
        form
      );
      setIsLoading(false);
      if (res.data?.token) {
        localStorage.setItem("user", JSON.stringify({ token: res.data.token }));
        setIsSuccess(true);
        navigate("/");
      } else {
        setIsSuccess(false);
        setMessage("Invalid email or password");
      }
    } catch (err: any) {
      setIsLoading(false);
      setIsSuccess(false);
      setMessage(
        err.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      const token: any = jwtDecode(credentialResponse.credential);
      const res = await axios.post(
        "https://taskmanagement-backend-xjgy.onrender.com/api/tasks/google-login",
        { token }
      );
      if (res.data?.token) {
        localStorage.setItem("user", JSON.stringify({ token: res.data.token }));
        navigate("/");
      }
    } catch (error) {
      console.error("Google login failed", error);
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
          <button
            type="button"
            className="google-login-btn"
            onClick={() => navigate("/email-login")}
          >
            Google verification Login
          </button>
          <p className="auth-link" onClick={() => navigate("/signup")}>
            Don&apos;t have an account? Sign up
          </p>
          <p className="auth-link" onClick={() => navigate("/forgot-password")}>
            Forgot Password?
          </p>

          {message && <div className="task-alert error">{message}</div>}
        </form>

        <div style={{ marginTop: "20px" }}>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => console.error("Login Failed")}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
