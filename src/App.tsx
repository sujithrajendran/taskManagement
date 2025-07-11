import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate
} from "react-router-dom";
import { useEffect, useState } from "react";
import SearchTask from "./components/SearchTask";
import CreateTask from "./components/CreateTask";
import GraphPage from "./components/GraphPage";
import TaskDetails from "./components/TaskDetails";
import UpdateTask from "./components/UpdateTask";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgetPassword";
import ResetPassword from "./components/ResetPassword";
import { Home } from "lucide-react";
import { LoadingProvider } from "./components/LoadingContext";
import GlobalLoader from "./components/GlobalLoader";
import { useAutoLogout } from "./Auth/Auth";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./App.css";

const AppHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isGraphPage = location.pathname === "/";

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="top-header">
      <div className="header-left" onClick={() => navigate("/")}>
        <Home size={24} style={{ marginRight: "10px", cursor: "pointer" }} />
        <h3 style={{ margin: 0 }}>Work Item</h3>
      </div>

      <div className="header-right">
        {isGraphPage && (
          <div className="chart-banner" onClick={() => navigate("/graph")}>
            📊 View Task Chart
          </div>
        )}
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
};

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const isLoggedIn = !!localStorage.getItem("user");
  return isLoggedIn ? <>{children}</> : <Navigate to="/login" />;
};

const ProtectedApp = () => {
  useAutoLogout();
  return (
    <div className="app-container">
      <AppHeader />
      <div className="main-layout">
        <aside className="sidebar"></aside>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<SearchTask />} />
            <Route path="/create" element={<CreateTask />} />
            <Route path="/graph" element={<GraphPage />} />
            <Route path="/task/:id" element={<TaskDetails />} />
            <Route path="/edit/:id" element={<UpdateTask />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("user"));

  useEffect(() => {
    const checkLogin = () => {
      setIsLoggedIn(!!localStorage.getItem("user"));
    };
    window.addEventListener("storage", checkLogin);
    return () => window.removeEventListener("storage", checkLogin);
  }, []);

  return (
    <GoogleOAuthProvider clientId="231869908036-q7qqui5l3s3ngmpamlfub4mhr2lbcg7e.apps.googleusercontent.com">
      <Router>
        <LoadingProvider>
          <GlobalLoader />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route
              path="*"
              element={
                <PrivateRoute>
                  <ProtectedApp />
                </PrivateRoute>
              }
            />
          </Routes>
        </LoadingProvider>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
