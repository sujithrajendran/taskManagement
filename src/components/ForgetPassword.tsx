import { useState } from "react";
import "../css/Auth.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // simulate API call
      setMessage("Reset instructions sent to your email");
    } catch {
      setMessage("Failed to send reset email");
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-heading">Forgot Password</h2>
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
  );
};

export default ForgotPassword;
