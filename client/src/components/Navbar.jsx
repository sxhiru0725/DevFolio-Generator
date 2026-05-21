import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

function Navbar() {
  const { user, logout } = useAuth();
  const { mode, toggleTheme } = useTheme();

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">
        <span className="logo-mark">D</span>
        DevFolio
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/create" className="nav-cta">
          Create Portfolio
        </Link>

        {user ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <span className="nav-user">Hi, {user.name}</span>
            <button className="nav-button" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        <button className="theme-toggle" onClick={toggleTheme}>
          {mode === "light" ? "Dark" : "Light"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
