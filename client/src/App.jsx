import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CreatePortfolio from "./pages/CreatePortfolio";
import PublicPortfolio from "./pages/PublicPortfolio";
import EditPortfolio from "./pages/EditPortfolio";
import PreviewPortfolio from "./pages/PreviewPortfolio";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import "./index.css";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreatePortfolio />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/preview" element={<PreviewPortfolio />} />
            <Route path="/portfolio/:username" element={<PublicPortfolio />} />
            <Route path="/edit/:username" element={<EditPortfolio />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
