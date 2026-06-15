import { Link } from "react-router-dom";
import homeIcon from "../../images/3d-house.png";
import loginIcon from "../../images/login.png";
import registerIcon from "../../images/verify.png";
import twitterIcon from "../../images/twitter.png";
import instagramIcon from "../../images/instagram.png";
import facebookIcon from "../../images/facebook.png";
import "./Footer.css";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-column">
          <h4>Quick Links</h4>

          <div className="footer-links">
            <Link to="/" className="footer-link">
              <img src={homeIcon} alt="" />
              Home
            </Link>

            <Link to="/login" className="footer-link">
              <img src={loginIcon} alt="" />
              Login
            </Link>

            <Link to="/register" className="footer-link">
              <img src={registerIcon} alt="" />
              Register
            </Link>
          </div>
        </div>

        <div className="footer-column footer-center">
          <div className="footer-logo">WorkForge</div>
          <p>
            Manage employees, tasks, attendance, and announcements with a clean
            and modern workforce experience.
          </p>
        </div>

        <div className="footer-column footer-right">
          <h4>Connect</h4>

          <div className="footer-socials">
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <img src={twitterIcon} alt="Twitter" />
            </a>

            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <img src={instagramIcon} alt="Instagram" />
            </a>

            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <img src={facebookIcon} alt="Facebook" />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Workforce Management System. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;