import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Auth.css";
import axios from "axios";

const Signup = () => {
  const [signUp, setSignUp] = useState({
    userName: "",
    password: "",
    email: ""
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("https://taskmanagement-backend-xjgy.onrender.com/api/tasks/register", signUp);
      navigate("/login");
    } catch {
      setMessage("Signup failed");
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
            onChange={(e) =>
              setSignUp({ ...signUp, userName: e.target.value })
            }
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            value={signUp.password}
            onChange={(e) =>
              setSignUp({ ...signUp, password: e.target.value })
            }
            required
          />

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
