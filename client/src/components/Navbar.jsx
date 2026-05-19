import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar">
            <div className="nav-logo">DevFolio Generator</div>

            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/create">Create Portfolio</Link>
            </div>
        </nav>
    );
}

export default Navbar;