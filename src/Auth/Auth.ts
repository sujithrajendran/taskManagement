import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

interface JWTPayload {
  exp: number;
}

export function useAutoLogout() {
  const navigate = useNavigate();

  useEffect(() => {
    const raw = localStorage.getItem("user");
    if (!raw) return;

    try {
      const { token } = JSON.parse(raw);
      const { exp } = jwtDecode<JWTPayload>(token);

      const now = Date.now() / 1000;
      if (exp < now) {
        console.log("Token expired — logging out.");
        localStorage.removeItem("user");
        navigate("/login");
      }
    } catch (err) {
      console.error("Token decoding failed — logging out.", err);
      localStorage.removeItem("user");
      navigate("/login");
    }
  }, [navigate]);
}
