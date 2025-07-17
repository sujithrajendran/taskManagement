import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Auth.css";
import axios from "axios";
import { useLoading } from "./LoadingContext";

const EmailLogin = () => {
  const { setIsLoading } = useLoading();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    try {
      setIsLoading(true);
      const result = await axios.post(
        "https://taskmanagement-backend-xjgy.onrender.com/api/tasks/send-otp",
        {
          email
        }
      );
      localStorage.setItem("user", JSON.stringify({ email }));
      setIsLoading(false);
      if (result && result.data.message === "Enter registred Email") {
        setMessage(result.data.message);
      } else {
        navigate("/enter-pin");
        setMessage("Passcode sent");
      }
    } catch {
      setIsLoading(false);
      setMessage("Failed to send magic link.");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2>Email Verification</h2>
        <form onSubmit={handleEmailLogin} className="auth-form">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Send Verification Link</button>
        </form>
        {message && <div className="task-alert success">{message}</div>}
        <p
          className="auth-link"
          style={{ marginTop: 12 }}
          onClick={() => navigate("/login")}
        >
          Back to Login
        </p>
      </div>
    </div>
  );
};

export default EmailLogin;
