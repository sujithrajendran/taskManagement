import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation
} from "react-router-dom";
import SearchTask from "./components/SearchTask";
import CreateTask from "./components/CreateTask";
import GraphPage from "./components/GraphPage";
import TaskDetails from "./components/TaskDetails";
import { Home } from "lucide-react";
import UpdateTask from "./components/UpdateTask";
import "./App.css";
import { LoadingProvider } from "./components/LoadingContext"
import GlobalLoader from "./components/GlobalLoader";

const AppHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isGraphPage = location.pathname === "/";
    
  return (
    <header className="top-header">
      <div className="header-left" onClick={() => navigate("/")}>
        <Home size={24} style={{ marginRight: "10px", cursor: "pointer" }} />
        <h3 style={{ margin: 0 }}>Work Item</h3>
      </div>

      {isGraphPage && (
        <div className="chart-banner" onClick={() => navigate("/graph")}>
          📊 View Task Chart
        </div>
      )}
    </header>
  );
};

function App() {
  return (
    <Router>
      <LoadingProvider>
        <GlobalLoader />
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
      </LoadingProvider>
    </Router>
  );
}

export default App;
