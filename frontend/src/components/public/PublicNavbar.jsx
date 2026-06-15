import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';

import homeIcon from '../../images/3d-house.png';
import loginIcon from '../../images/login.png';
import registerIcon from '../../images/verify.png';
import workforgeLogo from "../../images/workforge-logo.png";

import '../../styles/publicNavbar.css';

function PublicNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const linkStyle = ({ isActive }) => ({
    color: isActive ? '#ffffff' : '#e2e8f0',
    background: isActive ? 'rgba(255,255,255,0.12)' : 'transparent',
    padding: '10px 16px',
    borderRadius: '12px',
    textDecoration: 'none',
    fontWeight: 600,
    transition: 'all 0.25s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  });

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="public-navbar">
      <div className="public-navbar-inner">
        {/* Logo */}
        <div className="navbar-logo">WorkForge</div>
  
        {/* Hamburger */}
        <button
          className="hamburger-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>

        {/* Nav Links */}
        <nav className={`public-nav ${menuOpen ? 'active' : ''}`}>
          <NavLink to="/" style={linkStyle} onClick={closeMenu}>
            <img src={homeIcon} alt="Home" className="nav-icon" />
            Home
          </NavLink>

          <NavLink to="/login" style={linkStyle} onClick={closeMenu}>
            <img src={loginIcon} alt="Login" className="nav-icon" />
            Login
          </NavLink>

          <NavLink to="/register" style={linkStyle} onClick={closeMenu}>
            <img src={registerIcon} alt="Register" className="nav-icon" />
            Register
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default PublicNavbar;