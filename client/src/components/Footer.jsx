import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-about">
          <h2>
            Blog<span>Space.</span>
          </h2>

          <p>
            Share your ideas, explore interesting stories,
            and inspire the world through writing.
          </p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>

        <div className="footer-links">
          <h3>Explore</h3>
          <Link to="/#explore">Latest Blogs</Link>
          <Link to="/#about">About Us</Link>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 BlogSpace. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
