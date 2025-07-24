import { useEffect, useState } from "react";
import "../css/Auth.css";
import { useLoading } from "./LoadingContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import axiosInstance from "../Auth/AxiosInstance";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const { setIsLoading } = useLoading();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [passwordWarning, setPasswordWarning] = useState("");
  const [confirmWarning, setConfirmWarning] = useState("");

  const isStrongPassword = (password: string): boolean => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  useEffect(() => {
    if (password && !isStrongPassword(password)) {
      setPasswordWarning("Must be a strong password");
    } else {
      setPasswordWarning("");
    }

    if (confirmPassword && confirmPassword !== password) {
      setConfirmWarning("Passwords do not match.");
    } else {
      setConfirmWarning("");
    }
  }, [password, confirmPassword]);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordWarning || confirmWarning) return;

    try {
      setIsLoading(true);
      await axiosInstance.post(
        "https://taskmanagement-backend-xjgy.onrender.com/api/tasks/reset-password",
        { password },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setIsLoading(false);
      setMessage("Password reset successful. Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch {
      setIsLoading(false);
      setMessage("Password reset failed. Please try again.");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2>Reset Password</h2>
        <form onSubmit={handleResetPassword} className="auth-form">
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {passwordWarning && (
            <div className="task-alert error">{passwordWarning}</div>
          )}

          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {confirmWarning && (
            <div className="task-alert error">{confirmWarning}</div>
          )}

          <button
            type="submit"
            disabled={!!passwordWarning || !!confirmWarning}
          >
            Reset Password
          </button>

          {message && <div className="task-alert">{message}</div>}
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
