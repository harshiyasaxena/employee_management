import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiGrid,
  FiUsers,
  FiCheckSquare,
  FiClock,
  FiBell,
  FiBarChart2,
  FiUser,
  FiLogOut,
} from "react-icons/fi";
import "./ManagerTopbar.css";
import dashboardIcon from "../../images/3d-house.png";
import employeesIcon from "../../images/employees.png";
import tasksIcon from "../../images/tasks.png";
import attendanceIcon from "../../images/attendance.png";
import announcementsIcon from "../../images/announcements.png";
import analyticsIcon from "../../images/analytics.png";
import profileIcon from "../../images/profile.png";
import logoutIcon from "../../images/user-logout.png";

function ManagerTopbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const closeMenu = () => setMenuOpen(false);

  const linkClass = ({ isActive }) =>
    `manager-nav-link ${isActive ? "active" : ""}`;

  return (
    <header className="manager-topbar">
      <div className="manager-topbar-inner">
        <div className="manager-logo">WorkForge</div>

        <button
          className="manager-hamburger"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>

        <nav className={`manager-nav ${menuOpen ? "open" : ""}`}>
          <NavLink to="/manager" end className={linkClass} onClick={closeMenu}>
            <img src={dashboardIcon} alt="Dashboard" className="nav-icon-img" />
            Dashboard
          </NavLink>

          <NavLink
            to="/manager/employees"
            className={linkClass}
            onClick={closeMenu}
          >
            <img src={employeesIcon} alt="Employees" className="nav-icon-img" />
            Employees
          </NavLink>

          <NavLink
            to="/manager/tasks"
            className={linkClass}
            onClick={closeMenu}
          >
            <img src={tasksIcon} alt="Tasks" className="nav-icon-img" />
            Tasks
          </NavLink>

          <NavLink
            to="/manager/attendance"
            className={linkClass}
            onClick={closeMenu}
          >
            <img
              src={attendanceIcon}
              alt="Attendance"
              className="nav-icon-img"
            />
            Attendance
          </NavLink>

          <NavLink
            to="/manager/announcements"
            className={linkClass}
            onClick={closeMenu}
          >
            <img
              src={announcementsIcon}
              alt="Announcements"
              className="nav-icon-img"
            />
            Announcements
          </NavLink>

          <NavLink
            to="/manager/profile"
            className={linkClass}
            onClick={closeMenu}
          >
            <img src={profileIcon} alt="Profile" className="nav-icon-img" />
            Profile
          </NavLink>

          <button
            type="button"
            className="manager-nav-link logout-link"
            onClick={handleLogout}
          >
            <img src={logoutIcon} alt="Logout" className="nav-icon-img" />
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
}

export default ManagerTopbar;
