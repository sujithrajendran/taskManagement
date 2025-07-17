import { useState, useRef } from "react";
import "../css/Auth.css"; // your styles
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLoading } from "./LoadingContext";

const EnterPin = () => {
    const { setIsLoading } = useLoading();
  const [pin, setPin] = useState<string[]>(Array(6).fill(""));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (value: string, index: number) => {
    if (/^\d$/.test(value)) {
      const newPin = [...pin];
      newPin[index] = value;
      setPin(newPin);

      // Auto move to next input
      if (index < 5 && inputsRef.current[index + 1]) {
        inputsRef.current[index + 1]?.focus();
      }
    } else if (value === "") {
      const newPin = [...pin];
      newPin[index] = "";
      setPin(newPin);
    }
  };

  const handleBackspace = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && pin[index] === "") {
      if (index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const enteredPin = pin.join("");
    try {
      const userData = localStorage.getItem("user");
      const email = userData ? JSON.parse(userData).email : null;
      setIsLoading(true);
      const response = await axios.post(
        "https://taskmanagement-backend-xjgy.onrender.com/api/tasks/verify-otp",
        {
          email,
          otp: parseInt(enteredPin)
        }
      );
      setIsLoading(false);
      if (response.data.token) {
        localStorage.setItem(
          "user",
          JSON.stringify({ token: response.data.token })
        );
        navigate("/");
      } else {
        setMessage("Invalid or expired code");
      }
    } catch (err) {
      setMessage("Something went wrong. Try again.");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2>Enter Verification Code</h2>
        <form onSubmit={handleSubmit}>
          <div
            style={{ display: "flex", justifyContent: "center", gap: "10px" }}
          >
            {pin.map((digit, idx) => (
              <input
                key={idx}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, idx)}
                onKeyDown={(e) => handleBackspace(e, idx)}
                ref={(el) => {
                  inputsRef.current[idx] = el;
                }}
                style={{
                  width: "40px",
                  height: "40px",
                  fontSize: "24px",
                  textAlign: "center"
                }}
              />
            ))}
          </div>
          <button type="submit" className="primary-button">
            Verify Code
          </button>
          {message && <div className="task-alert error">{message}</div>}
        </form>
        <p
          className="auth-link"
          style={{ marginTop: 12 }}
          onClick={() => navigate("/email-login")}
        >
          Back to Email Login
        </p>
      </div>
    </div>
  );
};

export default EnterPin;
