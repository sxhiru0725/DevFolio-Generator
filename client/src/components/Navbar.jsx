import { Link } from "react-router-dom";

function Navbar() {
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
      </div>
    </nav>
  );
}

export default Navbar;
