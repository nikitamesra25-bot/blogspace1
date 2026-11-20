import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">
          Blog<span>Space</span>.
        </Link>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/#explore">Explore</Link>
          <Link to="/#about">About</Link>
        </div>

        <div className="nav-buttons">
          <Link to="/login" className="login-btn">
            Login
          </Link>

          <Link to="/register" className="signup-btn">
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
