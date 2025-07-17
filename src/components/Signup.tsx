import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Auth.css";
import axios from "axios";
import { useLoading } from "./LoadingContext";

const Signup = () => {
  const { setIsLoading } = useLoading();
  const [signUp, setSignUp] = useState({
    userName: "",
    password: "",
    confirmPassword: "",
    email: ""
  });

  const [message, setMessage] = useState("");
  const [passwordWarning, setPasswordWarning] = useState("");
  const [confirmWarning, setConfirmWarning] = useState("");
  const navigate = useNavigate();

  const isStrongPassword = (password: string): boolean => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  useEffect(() => {
    if (signUp.password && !isStrongPassword(signUp.password)) {
      setPasswordWarning("Must be a strong password");
    } else {
      setPasswordWarning("");
    }

    if (signUp.confirmPassword && signUp.confirmPassword !== signUp.password) {
      setConfirmWarning("Passwords do not match.");
    } else {
      setConfirmWarning("");
    }
  }, [signUp]);

  const handleSignup = async (e: React.FormEvent) => {
    if (passwordWarning || confirmWarning) return;
    e.preventDefault();
    setMessage("");
    try {
      setIsLoading(true);
      await axios.post("https://taskmanagement-backend-xjgy.onrender.com/api/tasks/register", signUp);
      setIsLoading(false);
      navigate("/login");
    } catch (err) {
      setIsLoading(false);
      setMessage("Signup failed. Please try again.");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSignup} className="auth-form">
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            value={signUp.email}
            onChange={(e) => setSignUp({ ...signUp, email: e.target.value })}
            required
          />

          <label>Username</label>
          <input
            type="text"
            placeholder="Username"
            value={signUp.userName}
            onChange={(e) => setSignUp({ ...signUp, userName: e.target.value })}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            value={signUp.password}
            onChange={(e) => setSignUp({ ...signUp, password: e.target.value })}
            required
          />
          {passwordWarning && (
            <div className="task-alert error">{passwordWarning}</div>
          )}

          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm Password"
            value={signUp.confirmPassword}
            onChange={(e) =>
              setSignUp({ ...signUp, confirmPassword: e.target.value })
            }
            required
          />
          {confirmWarning && (
            <div className="task-alert error">{confirmWarning}</div>
          )}
          <button type="submit">Sign Up</button>
          <p className="auth-link" onClick={() => navigate("/login")}>
            Already have an account? Login
          </p>
          {message && <div className="task-alert error">{message}</div>}
        </form>
      </div>
    </div>
  );
};

export default Signup;
