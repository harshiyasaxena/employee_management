import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCheckCircle,
  FiClock,
  FiBell,
  FiBarChart2,
  FiLogOut,
  FiSearch,
  FiMoreVertical,
  FiCalendar,
  FiMapPin,
  FiUser,
  FiSave,
  FiX,
  FiArrowRight,
} from "react-icons/fi";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

import Footer from "../components/common/Footer";
import "./employeeDashboard.css";
import bgPublic from "../images/manager_bg.jpg";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const EmployeeDashboard = () => {
  const [activeTab, setActiveTab] = useState("tasks");
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showMembersList, setShowMembersList] = useState(false);

  const [taskSearch, setTaskSearch] = useState("");
  const [taskFilter, setTaskFilter] = useState("ALL");

  const [isAttendanceFormOpen, setIsAttendanceFormOpen] = useState(false);
  const [attendanceFormType, setAttendanceFormType] = useState("");
  const [selectedAttendanceDate, setSelectedAttendanceDate] = useState("");
  const [leaveType, setLeaveType] = useState("SINGLE");
  const [leaveStartDate, setLeaveStartDate] = useState("");
  const [leaveEndDate, setLeaveEndDate] = useState("");

  const [user, setUser] = useState(null);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [taskStats, setTaskStats] = useState({
    assignedTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
  });

  const [tasks, setTasks] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const fetchProfile = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/api/employees/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }

      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error("Error loading profile:", error);
    }
  }, []);

  const fetchTaskStats = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/api/tasks/my/stats`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch task stats");
      }

      const data = await response.json();
      setTaskStats(data);
    } catch (error) {
      console.error("Error loading task stats:", error);
    }
  }, []);

  const fetchMyTasks = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/api/tasks/my`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }

      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error loading tasks:", error);
    }
  }, []);

  const fetchAttendance = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/api/attendance/my`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch attendance");
      }

      const data = await response.json();
      setAttendanceRecords(data);
    } catch (error) {
      console.error("Error loading attendance:", error);
    }
  }, []);

  const fetchAnnouncements = useCallback(async (role) => {
    try {
      if (!role) return;

      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_BASE_URL}/api/announcements/role/${role}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch announcements");
      }

      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error("Error loading announcements:", error);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
    fetchTaskStats();
    fetchMyTasks();
    fetchAttendance();
  }, [fetchProfile, fetchTaskStats, fetchMyTasks, fetchAttendance]);

  useEffect(() => {
    if (user?.role) {
      fetchAnnouncements(user.role);
    }
  }, [user, fetchAnnouncements]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchMyTasks();
    }, 30000);

    return () => clearInterval(interval);
  }, [fetchMyTasks]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const handleCheckIn = async () => {
    try {
      if (!user?.id) {
        alert("User not loaded yet");
        return;
      }

      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_BASE_URL}/api/attendance/checkin/${user.id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Check-in failed");
      }

      await response.json();
      await fetchAttendance();
      alert("Checked in successfully");
    } catch (error) {
      console.error(error);
      alert("Check-in failed");
    }
  };

  const handleCheckOut = async () => {
    try {
      if (!user?.id) {
        alert("User not loaded yet");
        return;
      }

      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_BASE_URL}/api/attendance/checkout/${user.id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Checkout failed");
      }

      await response.json();
      await fetchAttendance();
      alert("Checked out successfully");
    } catch (error) {
      console.error(error);
      alert("Checkout failed");
    }
  };

  const handleApplyLeave = async () => {
    try {
      if (!user?.id) {
        alert("User not loaded yet");
        return;
      }

      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_BASE_URL}/api/attendance/leave/${user.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            startDate:
              leaveType === "SINGLE" ? selectedAttendanceDate : leaveStartDate,
            endDate:
              leaveType === "SINGLE" ? selectedAttendanceDate : leaveEndDate,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Leave request failed");
      }

      await response.json();
      await fetchAttendance();

      alert("Leave applied successfully");

      setIsAttendanceFormOpen(false);
      setAttendanceFormType("");
      setSelectedAttendanceDate("");
      setLeaveType("SINGLE");
      setLeaveStartDate("");
      setLeaveEndDate("");
    } catch (error) {
      console.error(error);
      alert("Failed to apply leave");
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const title = task.title || "";
    const description = task.description || "";

    const matchesSearch =
      title.toLowerCase().includes(taskSearch.toLowerCase()) ||
      description.toLowerCase().includes(taskSearch.toLowerCase());

    const matchesFilter =
      taskFilter === "ALL" || (task.status || "").toUpperCase() === taskFilter;

    return matchesSearch && matchesFilter;
  });

  const calculateHours = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) return 0;

    const start = new Date(`1970-01-01T${checkIn}`);
    const end = new Date(`1970-01-01T${checkOut}`);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) return 0;

    return Number(((end - start) / (1000 * 60 * 60)).toFixed(1));
  };

  const reportData = attendanceRecords.map((record) => ({
    name: new Date(record.date).toLocaleDateString("en-US", {
      weekday: "short",
    }),
    hours: calculateHours(record.checkIn, record.checkOut),
    tasks: tasks.filter(
      (task) => task.status === "COMPLETED" && task.deadline === record.date
    ).length,
  }));

  const avatarUrl = user?.name
    ? `https://api.dicebear.com/7.x/notionists/svg?seed=${user.name}`
    : "https://api.dicebear.com/7.x/notionists/svg?seed=employee";

  const renderTabContent = () => {
    switch (activeTab) {
      case "tasks":
        return (
          <motion.div
            key="tasks"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="tab-content"
          >
            <div className="section-header">
              <div>
                <h2>Current Tasks</h2>
                <p>Track your assigned work and prioritize accordingly.</p>
              </div>

              <button className="action-btn" type="button">
                View All <FiArrowRight />
              </button>
            </div>

            <div className="tasks-section-border">
              <div className="tasks-toolbar">
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={taskSearch}
                  onChange={(e) => setTaskSearch(e.target.value)}
                  className="task-search-input"
                />

                <select
                  value={taskFilter}
                  onChange={(e) => setTaskFilter(e.target.value)}
                  className="task-filter-select"
                >
                  <option value="ALL">All</option>
                  <option value="PENDING">Pending</option>
                  <option value="COMPLETED">Completed</option>
                </select>
              </div>

              <div className="tasks-grid">
                {filteredTasks.map((task) => (
                  <motion.div
                    key={task.id}
                    className="task-card modern-card"
                    whileHover={{ y: -6 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedTask(task)}
                  >
                    <div className="task-header">
                      <span
                        className={`priority-badge ${(
                          task.priority || ""
                        ).toLowerCase()}`}
                      >
                        {task.priority}
                      </span>

                      <button className="icon-btn" type="button">
                        <FiMoreVertical />
                      </button>
                    </div>

                    <h3>{task.title}</h3>
                    <p className="task-desc">{task.description || "-"}</p>

                    <div className="task-footer">
                      <div className="task-due">
                        <FiClock /> {task.deadline}
                      </div>

                      <span
                        className={`status-pill ${(task.status || "").toLowerCase()}`}
                      >
                        {task.status}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        );

      case "attendance":
        return (
          <motion.div
            key="attendance"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="tab-content tasks-section-border"
          >
            <div className="section-header">
              <div>
                <h2>Attendance Record</h2>
                <p>Your attendance history and today's check-in status.</p>
              </div>

              <div className="attendance-actions-row">
                <button
                  className="attendance-action-btn checkin"
                  onClick={handleCheckIn}
                  type="button"
                >
                  Check In
                </button>

                <button
                  className="attendance-action-btn checkout"
                  onClick={handleCheckOut}
                  type="button"
                >
                  Check Out
                </button>

                <button
                  className="attendance-action-btn leave"
                  onClick={() => {
                    setAttendanceFormType("LEAVE");
                    setLeaveType("SINGLE");
                    setSelectedAttendanceDate("");
                    setLeaveStartDate("");
                    setLeaveEndDate("");
                    setIsAttendanceFormOpen(true);
                  }}
                  type="button"
                >
                  Apply Leave
                </button>
              </div>
            </div>

            <AnimatePresence>
              {isAttendanceFormOpen && attendanceFormType === "LEAVE" && (
                <motion.div
                  initial={{ height: 0, opacity: 0, marginBottom: 0 }}
                  animate={{ height: "auto", opacity: 1, marginBottom: 24 }}
                  exit={{ height: 0, opacity: 0, marginBottom: 0 }}
                  className="attendance-form-wrapper modern-card"
                >
                  <div className="attendance-form">
                    <h3>Apply Leave</h3>

                    <div className="input-group">
                      <label>Leave Type</label>
                      <select
                        value={leaveType}
                        onChange={(e) => setLeaveType(e.target.value)}
                        className="time-input"
                      >
                        <option value="SINGLE">Single Day</option>
                        <option value="RANGE">Date Range</option>
                      </select>
                    </div>

                    {leaveType === "SINGLE" && (
                      <div className="input-group">
                        <label>Select Leave Date</label>
                        <input
                          type="date"
                          value={selectedAttendanceDate}
                          onChange={(e) =>
                            setSelectedAttendanceDate(e.target.value)
                          }
                          className="time-input"
                        />
                      </div>
                    )}

                    {leaveType === "RANGE" && (
                      <>
                        <div className="input-group">
                          <label>Start Date</label>
                          <input
                            type="date"
                            value={leaveStartDate}
                            onChange={(e) => setLeaveStartDate(e.target.value)}
                            className="time-input"
                          />
                        </div>

                        <div className="input-group">
                          <label>End Date</label>
                          <input
                            type="date"
                            value={leaveEndDate}
                            onChange={(e) => setLeaveEndDate(e.target.value)}
                            className="time-input"
                          />
                        </div>
                      </>
                    )}

                    <div className="form-actions">
                      <button
                        className="cancel-btn"
                        onClick={() => {
                          setIsAttendanceFormOpen(false);
                          setAttendanceFormType("");
                          setSelectedAttendanceDate("");
                          setLeaveType("SINGLE");
                          setLeaveStartDate("");
                          setLeaveEndDate("");
                        }}
                        type="button"
                      >
                        Cancel
                      </button>

                      <button
                        className="save-btn"
                        onClick={handleApplyLeave}
                        disabled={
                          leaveType === "SINGLE"
                            ? !selectedAttendanceDate
                            : !leaveStartDate || !leaveEndDate
                        }
                        type="button"
                      >
                        <FiSave /> Save
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="modern-card table-container attendance-scroll-area">
              <table className="modern-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Check In</th>
                    <th>Check Out</th>
                    <th>Location</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceRecords.map((record) => (
                    <tr key={record.id}>
                      <td>
                        <div className="cell-flex">
                          <FiCalendar className="cell-icon" />
                          {record.date}
                        </div>
                      </td>

                      <td>{record.checkIn || "-"}</td>

                      <td>{record.checkOut || "-"}</td>

                      <td>
                        <div className="cell-flex">
                          <FiMapPin className="cell-icon" />
                          Office
                        </div>
                      </td>

                      <td>
                        <span
                          className={`status-badge ${(
                            record.status || ""
                          ).toLowerCase()}`}
                        >
                          {record.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        );

      case "reports":
        return (
          <motion.div
            key="reports"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="tab-content"
          >
            <div className="section-header">
              <div>
                <h2>Weekly Performance</h2>
                <p>Overview of productivity and completed work.</p>
              </div>

              <select className="period-select">
                <option>This Week</option>
                <option>Last Week</option>
                <option>This Month</option>
              </select>
            </div>

            <div className="charts-grid">
              <div className="modern-card chart-card">
                <h3>Productivity (Hours)</h3>
                <div className="chart-wrapper">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={reportData}>
                      <defs>
                        <linearGradient
                          id="colorHours"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#2563eb"
                            stopOpacity={0.35}
                          />
                          <stop
                            offset="95%"
                            stopColor="#2563eb"
                            stopOpacity={0}
                        />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="#e2e8f0"
                      />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <Tooltip
                        contentStyle={{
                          borderRadius: "12px",
                          border:"none",
                          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="hours"
                        stroke="#2563eb"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorHours)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="modern-card chart-card">
                <h3>Tasks Completed</h3>
                <div className="chart-wrapper">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={reportData}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="#e2e8f0"
                      />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <Tooltip
                        cursor={{ fill: "transparent" }}
                        contentStyle={{
                          borderRadius: "12px",
                          border: "none",
                          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                        }}
                      />
                      <Bar
                        dataKey="tasks"
                        fill="#7c3aed"
                        radius={[8, 8, 0, 0]}
                        barSize={32}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className="app-wrapper"
      style={{
        backgroundImage: `url(${bgPublic})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <nav className="dashboard-navbar">
        <div className="nav-brand">
          <div className="manager-logo">WorkForge</div>
        </div>

        <div className="nav-search">
          <FiSearch className="search-icon" />
          <input type="text" placeholder="Search tasks, reports..." />
        </div>

        <div className="nav-actions">
          <div className="notification-wrapper">
            <button
              className="icon-btn notif-btn"
              onClick={() => {
                setIsNotifOpen(!isNotifOpen);
                setIsProfileOpen(false);
              }}
              type="button"
            >
              <FiBell />
              <span className="notif-badge">{notifications.length}</span>
            </button>

            <AnimatePresence>
              {isNotifOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="dropdown-menu notif-dropdown"
                >
                  <div className="dropdown-header">
                    <h3>Notifications</h3>
                    <button className="text-btn" type="button">
                      Mark all read
                    </button>
                  </div>

                  <div className="dropdown-body">
                    {notifications.map((n) => (
                      <div key={n.id} className="notif-item">
                        <div className={`notif-dot ${n.type || ""}`}></div>
                        <div className="notif-content">
                          <h4>{n.title}</h4>
                          <p>{n.message}</p>
                          <span>
                            {new Date(n.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="user-profile-nav">
            <button
              className="avatar-btn"
              type="button"
              onClick={() => {
                setIsProfileOpen(!isProfileOpen);
                setIsNotifOpen(false);
              }}
            >
              <img src={avatarUrl} alt="Profile" className="nav-avatar" />
            </button>

            <AnimatePresence>
              {isProfileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="dropdown-menu profile-dropdown"
                >
                  <div className="profile-summary">
                    <img
                      src={avatarUrl}
                      alt="Profile"
                      className="profile-summary-avatar"
                    />
                    <div>
                      <h4>{user?.name || "Employee"}</h4>
                      <p>{user?.department || "Department"}</p>
                    </div>
                  </div>

                  <div className="dropdown-body">
                    <button className="dropdown-item" type="button">
                      <FiUser className="item-icon" />
                      Profile
                    </button>

                    <div className="dropdown-divider"></div>

                    <button
                      className="dropdown-item logout-text"
                      type="button"
                      onClick={handleLogout}
                    >
                      <FiLogOut className="item-icon" />
                      Logout
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </nav>

      <main className="employee-dashboard">
        <div className="dashboard-container">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="hero-section modern-card"
          >
            <div className="hero-content">
              <h1 className="hero-title">
                Welcome back, {user?.name?.split(" ")[0] || "Employee"}{" "}
                <span className="wave-emoji">👋</span>
              </h1>
            </div>

            <div className="hero-stats">
              <div className="stat-pill">
                <div className="stat-icon-wrapper blue-bg">
                  <FiCheckCircle />
                </div>
                <div className="stat-info">
                  <p>Completed</p>
                  <h3>{taskStats.completedTasks}</h3>
                </div>
              </div>

              <div className="stat-pill">
                <div className="stat-icon-wrapper purple-bg">
                  <FiClock />
                </div>
                <div className="stat-info">
                  <p>Pending</p>
                  <h3>{taskStats.pendingTasks}</h3>
                </div>
              </div>
            </div>
          </motion.section>

          <section className="navigation-grid">
            <motion.div
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab("tasks")}
              className={`nav-card ${activeTab === "tasks" ? "active" : ""}`}
            >
              <div className="nav-card-icon blue">
                <FiCheckCircle />
              </div>
              <h3>My Tasks</h3>
              <p>{taskStats.assignedTasks} Active</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab("attendance")}
              className={`nav-card ${
                activeTab === "attendance" ? "active" : ""
              }`}
            >
              <div className="nav-card-icon green">
                <FiClock />
              </div>
              <h3>Attendance</h3>
              <p>On time today</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab("reports")}
              className={`nav-card ${activeTab === "reports" ? "active" : ""}`}
            >
              <div className="nav-card-icon purple">
                <FiBarChart2 />
              </div>
              <h3>Reports</h3>
              <p>Weekly overview</p>
            </motion.div>
          </section>

          <section className="dynamic-content-section">
            <AnimatePresence mode="wait">{renderTabContent()}</AnimatePresence>
          </section>
        </div>
      </main>

      <AnimatePresence>
        {selectedTask && (
          <>
            <motion.div
              className="task-modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setSelectedTask(null);
                setShowMembersList(false);
              }}
            />

            <motion.div
              className="task-modal"
              initial={{ opacity: 0, scale: 0.9, x: "-50%", y: "-40%" }}
              animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
              exit={{ opacity: 0, scale: 0.9, x: "-50%", y: "-40%" }}
            >
              <div className="modal-header">
                <h2>{selectedTask.title}</h2>
                <button
                  className="close-modal"
                  onClick={() => setSelectedTask(null)}
                  type="button"
                >
                  <FiX />
                </button>
              </div>

              <div className="modal-body">
                <p>{selectedTask.description}</p>

                <div className="task-meta">
                  <span>{selectedTask.priority}</span>
                  <span>{selectedTask.status}</span>
                </div>

                <h3>Assigned By</h3>

                <div className="member-row">
                  <div className="member-avatar">
                    {selectedTask.assignedBy?.name?.charAt(0).toUpperCase() ||
                      "M"}
                  </div>
                  <span>{selectedTask.assignedBy?.name || "Manager"}</span>
                </div>

                <br />

                <p>
                  <strong>Deadline:</strong> {selectedTask.deadline}
                </p>

                <p>
                  <strong>Status:</strong> {selectedTask.status}
                </p>

                <p>
                  <strong>Priority:</strong> {selectedTask.priority}
                </p>

                <div style={{ marginTop: "20px" }}>
                  <button
                    className="save-btn"
                    onClick={async () => {
                      try {
                        const token = localStorage.getItem("token");

                        const newStatus =
                          selectedTask.status === "COMPLETED"
                            ? "PENDING"
                            : "COMPLETED";

                        const response = await fetch(
                          `${API_BASE_URL}/api/tasks/${selectedTask.id}/status?status=${newStatus}`,
                          {
                            method: "PUT",
                            headers: {
                              Authorization: `Bearer ${token}`,
                            },
                          }
                        );

                        if (!response.ok) {
                          throw new Error("Failed to update status");
                        }

                        const updatedTask = await response.json();

                        setTasks((prev) =>
                          prev.map((task) =>
                            task.id === updatedTask.id ? updatedTask : task
                          )
                        );

                        setSelectedTask(updatedTask);
                        await fetchTaskStats();
                      } catch (error) {
                        console.error(error);
                      }
                    }}
                    type="button"
                  >
                    {selectedTask.status === "COMPLETED"
                      ? "Mark Pending"
                      : "Mark Completed"}
                  </button>
                </div>

                <AnimatePresence>
                  {showMembersList && (
                    <motion.div
                      className="members-list"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      {selectedTask.members &&
                        selectedTask.members.map((member) => (
                          <div key={member.id} className="member-row">
                            <div className="member-avatar">
                              {member.name.charAt(0).toUpperCase()}
                            </div>
                            <span>{member.name}</span>
                          </div>
                        ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default EmployeeDashboard;