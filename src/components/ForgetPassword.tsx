import { useState } from "react";
import "../css/Auth.css";
import { useLoading } from "./LoadingContext";
import axiosInstance from "../Auth/AxiosInstance";

const ForgotPassword = () => {
  const { setIsLoading } = useLoading();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await axiosInstance.post("https://taskmanagement-backend-xjgy.onrender.com/api/tasks/forget-password", {
        email
      });
      setIsLoading(false);
      setMessage("Reset instructions sent to your email");
    } catch {
      setMessage("Failed to send reset email");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2>Forgot Password</h2>
        <form onSubmit={handleForgotPassword} className="auth-form">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Send Reset Link</button>
          {message && <div className="task-alert">{message}</div>}
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
