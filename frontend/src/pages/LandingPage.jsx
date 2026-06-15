import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiShield,
  FiCheckCircle,
  FiUsers,
  FiTrendingUp,
  FiArrowUp,
} from "react-icons/fi";
import { Link } from "react-router-dom";

import secureIcon from "../images/security.png";
import roleIcon from "../images/easy-access.png";
import trackingIcon from "../images/real-time.png";
import managementImg from "../images/management.png";
import team1 from "../images/task1.png";
import team2 from "../images/team2.jpg";
import team3 from "../images/team3.jpg";
import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";

import "../styles/landingPage.css";

function LandingPage() {
  const fullTitle = "Work smarter, Manage better, Grow faster";
  const [typedTitle, setTypedTitle] = useState("");
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [activeRole, setActiveRole] = useState(null);

  const roles = [
    {
      title: "Manager",
      text: "Manage employees, review attendance, assign tasks, and monitor overall performance.",
      color: "#2563eb",
      icon: "👔",
    },
    {
      title: "Team Lead",
      text: "Track team tasks, give updates, and keep work flowing smoothly across members.",
      color: "#16a34a",
      icon: "🧑‍💼",
    },
    {
      title: "Employee",
      text: "View tasks, mark attendance, and stay updated with announcements and deadlines.",
      color: "#7c3aed",
      icon: "👤",
    },
  ];

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      setTypedTitle(fullTitle.slice(0, index + 1));
      index++;

      if (index === fullTitle.length) {
        clearInterval(interval);

        setTimeout(() => {
          setShowSubtitle(true);
        }, 300);
      }
    }, 70);

    return () => clearInterval(interval);
  }, []);

  const baseNodes = [
    {
      id: "start",
      position: { x: 300, y: 20 },
      data: { label: "Register / Login" },
      style: {
        background: "#103d9e",
        color: "white",
        borderRadius: "12px",
        padding: "10px 16px",
        border: "none",
        fontWeight: 700,
      },
    },
    {
      id: "role",
      position: { x: 300, y: 120 },
      data: { label: "Role-based Access" },
      style: {
        background: "#2563eb",
        color: "white",
        borderRadius: "12px",
        padding: "10px 16px",
        border: "none",
        fontWeight: 700,
      },
    },
    {
      id: "manager",
      position: { x: 80, y: 240 },
      data: { label: "Manager" },
      style: {
        background: activeRole === "manager" ? "#7c3aed" : "#ddd",
        color: activeRole === "manager" ? "white" : "#0f172a",
        borderRadius: "12px",
        padding: "10px 16px",
        border: "none",
        fontWeight: 700,
        cursor: "pointer",
      },
    },
    {
      id: "teamlead",
      position: { x: 300, y: 240 },
      data: { label: "Team Lead" },
      style: {
        background: activeRole === "teamLead" ? "#16a34a" : "#ddd",
        color: activeRole === "teamLead" ? "white" : "#0f172a",
        borderRadius: "12px",
        padding: "10px 16px",
        border: "none",
        fontWeight: 700,
        cursor: "pointer",
      },
    },
    {
      id: "employee",
      position: { x: 520, y: 240 },
      data: { label: "Employee" },
      style: {
        background: activeRole === "employee" ? "#f59e0b" : "#ddd",
        color: activeRole === "employee" ? "white" : "#0f172a",
        borderRadius: "12px",
        padding: "10px 16px",
        border: "none",
        fontWeight: 700,
        cursor: "pointer",
      },
    },
  ];

  const managerNodes = [
    {
      id: "m1",
      position: { x: 0, y: 360 },
      data: { label: "Assign Tasks" },
      style: {
        background: "#dbeafe",
        color: "#1e3a8a",
        borderRadius: "10px",
        padding: "10px 14px",
        border: "1px solid #93c5fd",
      },
    },
    {
      id: "m2",
      position: { x: 180, y: 360 },
      data: { label: "View Attendance Reports" },
      style: {
        background: "#dbeafe",
        color: "#1e3a8a",
        borderRadius: "10px",
        padding: "10px 14px",
        border: "1px solid #93c5fd",
      },
    },
    {
      id: "m3",
      position: { x: 390, y: 360 },
      data: { label: "Add / Remove Employees" },
      style: {
        background: "#dbeafe",
        color: "#1e3a8a",
        borderRadius: "10px",
        padding: "10px 14px",
        border: "1px solid #93c5fd",
      },
    },
    {
      id: "m4",
      position: { x: 620, y: 360 },
      data: { label: "Monitor Statistics" },
      style: {
        background: "#dbeafe",
        color: "#1e3a8a",
        borderRadius: "10px",
        padding: "10px 14px",
        border: "1px solid #93c5fd",
      },
    },
    {
      id: "m5",
      position: { x: 820, y: 360 },
      data: { label: "Make Informed Decisions" },
      style: {
        background: "#dbeafe",
        color: "#1e3a8a",
        borderRadius: "10px",
        padding: "10px 14px",
        border: "1px solid #93c5fd",
      },
    },
  ];

  const teamLeadNodes = [
    {
      id: "t1",
      position: { x: 160, y: 360 },
      data: { label: "Assign Tasks" },
      style: {
        background: "#dcfce7",
        color: "#166534",
        borderRadius: "10px",
        padding: "10px 14px",
        border: "1px solid #86efac",
      },
    },
    {
      id: "t2",
      position: { x: 410, y: 360 },
      data: { label: "Monitor Attendance" },
      style: {
        background: "#dcfce7",
        color: "#166534",
        borderRadius: "10px",
        padding: "10px 14px",
        border: "1px solid #86efac",
      },
    },
    {
      id: "t3",
      position: { x: 670, y: 360 },
      data: { label: "Track Team Progress" },
      style: {
        background: "#dcfce7",
        color: "#166534",
        borderRadius: "10px",
        padding: "10px 14px",
        border: "1px solid #86efac",
      },
    },
  ];

  const employeeNodes = [
    {
      id: "e1",
      position: { x: 80, y: 360 },
      data: { label: "Mark Attendance" },
      style: {
        background: "#fef3c7",
        color: "#92400e",
        borderRadius: "10px",
        padding: "10px 14px",
        border: "1px solid #fcd34d",
      },
    },
    {
      id: "e2",
      position: { x: 280, y: 360 },
      data: { label: "View Tasks" },
      style: {
        background: "#fef3c7",
        color: "#92400e",
        borderRadius: "10px",
        padding: "10px 14px",
        border: "1px solid #fcd34d",
      },
    },
    {
      id: "e3",
      position: { x: 470, y: 360 },
      data: { label: "Get Reminders" },
      style: {
        background: "#fef3c7",
        color: "#92400e",
        borderRadius: "10px",
        padding: "10px 14px",
        border: "1px solid #fcd34d",
      },
    },
    {
      id: "e4",
      position: { x: 680, y: 360 },
      data: { label: "View Performance" },
      style: {
        background: "#fef3c7",
        color: "#92400e",
        borderRadius: "10px",
        padding: "10px 14px",
        border: "1px solid #fcd34d",
      },
    },
  ];

  const baseEdges = [
    {
      id: "start-role",
      source: "start",
      target: "role",
      animated: true,
      style: { stroke: "#103d9e", strokeWidth: 2 },
    },
    {
      id: "role-manager",
      source: "role",
      target: "manager",
      animated: true,
      style: { stroke: "#103d9e", strokeWidth: 2 },
    },
    {
      id: "role-teamlead",
      source: "role",
      target: "teamlead",
      animated: true,
      style: { stroke: "#103d9e", strokeWidth: 2 },
    },
    {
      id: "role-employee",
      source: "role",
      target: "employee",
      animated: true,
      style: { stroke: "#103d9e", strokeWidth: 2 },
    },
  ];

  const managerEdges = [
    {
      id: "m1",
      source: "manager",
      target: "m1",
      animated: true,
      style: { stroke: "#2563eb", strokeWidth: 2 },
    },
    {
      id: "m2",
      source: "manager",
      target: "m2",
      animated: true,
      style: { stroke: "#2563eb", strokeWidth: 2 },
    },
    {
      id: "m3",
      source: "manager",
      target: "m3",
      animated: true,
      style: { stroke: "#2563eb", strokeWidth: 2 },
    },
    {
      id: "m4",
      source: "manager",
      target: "m4",
      animated: true,
      style: { stroke: "#2563eb", strokeWidth: 2 },
    },
    {
      id: "m5",
      source: "manager",
      target: "m5",
      animated: true,
      style: { stroke: "#2563eb", strokeWidth: 2 },
    },
  ];

  const teamLeadEdges = [
    {
      id: "t1",
      source: "teamlead",
      target: "t1",
      animated: true,
      style: { stroke: "#16a34a", strokeWidth: 2 },
    },
    {
      id: "t2",
      source: "teamlead",
      target: "t2",
      animated: true,
      style: { stroke: "#16a34a", strokeWidth: 2 },
    },
    {
      id: "t3",
      source: "teamlead",
      target: "t3",
      animated: true,
      style: { stroke: "#16a34a", strokeWidth: 2 },
    },
  ];

  const employeeEdges = [
    {
      id: "e1",
      source: "employee",
      target: "e1",
      animated: true,
      style: { stroke: "#f59e0b", strokeWidth: 2 },
    },
    {
      id: "e2",
      source: "employee",
      target: "e2",
      animated: true,
      style: { stroke: "#f59e0b", strokeWidth: 2 },
    },
    {
      id: "e3",
      source: "employee",
      target: "e3",
      animated: true,
      style: { stroke: "#f59e0b", strokeWidth: 2 },
    },
    {
      id: "e4",
      source: "employee",
      target: "e4",
      animated: true,
      style: { stroke: "#f59e0b", strokeWidth: 2 },
    },
  ];

  const nodes = [
    ...baseNodes,
    ...(activeRole === "manager" ? managerNodes : []),
    ...(activeRole === "teamLead" ? teamLeadNodes : []),
    ...(activeRole === "employee" ? employeeNodes : []),
  ];

  const edges = [
    ...baseEdges,
    ...(activeRole === "manager" ? managerEdges : []),
    ...(activeRole === "teamLead" ? teamLeadEdges : []),
    ...(activeRole === "employee" ? employeeEdges : []),
  ];

  return (
    <div className="landing-page">
      <main className="landing-main">
        {/* HERO SECTION */}
        <div className="hero-grid">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="hero-left-wrap"
          >
            <div className="hero-badge">
              <FiShield />
              Smart Workforce Management
            </div>

            <h1 className="hero-heading typing-title">
              {typedTitle}
              <span className="typing-cursor">|</span>
            </h1>
            {showSubtitle && (
              <motion.p
                className="hero-subtitle hero-description"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Track employees, tasks, attendance, and announcements in one
                platform for managers, team leads, and employees.
              </motion.p>
            )}

            <div className="hero-actions">
              <Link to="/login" className="hero-btn hero-btn-primary">
                Login <FiArrowRight />
              </Link>

              <Link to="/register" className="hero-btn hero-btn-secondary">
                Register
              </Link>
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 24, scale: 0.98 }}
            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
            }}
            transition={{ duration: 0.7 }}
            className="hero-card"
          >
            <motion.div
              className="hero-image-wrap"
              animate={{
                y: [0, -10, 0],
                x: [0, 6, 0],
                rotate: [0, 1.2, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <img
                src={managementImg}
                alt="Workforce Management"
                className="hero-card-image"
              />
            </motion.div>

            <h3 className="hero-card-title">Team collaboration made simple</h3>

            <p className="hero-card-text">
              Smooth workflow for tasks, attendance, announcements, and team
              productivity.
            </p>
          </motion.div>
        </div>

        {/* HOW IT HELPS */}
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="timeline-section"
        >
          <h2 className="section-heading">How the platform helps</h2>

          <p className="section-subtitle">
            A clean and simple workflow for managing your workforce.
          </p>

          <div className="timeline-wrapper">
            {[
              {
                title: "Task Management",
                text: "Assign and track tasks for your employees.",
              },
              {
                title: "Attendance Monitoring",
                text: "Check in, check out, and track presence.",
              },
              {
                title: "Announcements",
                text: "Share updates with teams and departments.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 18, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: 0.12 * index }}
                className="timeline-card"
              >
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop",
                    delay: index * 0.2,
                  }}
                  className="timeline-image-wrap"
                >
                  <img
                    src={index === 0 ? team1 : index === 1 ? team2 : team3}
                    alt={item.title}
                    className="timeline-image"
                  />
                </motion.div>

                <div className="timeline-step">{index + 1}</div>

                <div className="timeline-title">{item.title}</div>

                <div className="timeline-text">{item.text}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="timeline-section"
        >
          <h2 className="section-heading">How the platform helps</h2>

          <p className="section-subtitle">
            Click on a role to expand its workflow.
          </p>

          <div style={{ height: "360px", width: "100%" }}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              fitView
              onNodeClick={(event, node) => {
                if (node.id === "manager") setActiveRole("manager");
                if (node.id === "teamlead") setActiveRole("teamLead");
                if (node.id === "employee") setActiveRole("employee");
              }}
            >
              <Background />
              <Controls />
            </ReactFlow>
          </div>
        </motion.section>

        {/* CALL TO ACTION */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="cta-section"
        >
          <div className="cta-badge">🚀 Start Today</div>

          <h2 className="cta-heading">Ready to streamline your workforce?</h2>

          <p className="cta-text">
            Start managing employees, tasks, attendance, and announcements from
            one centralized and beautifully designed platform.
          </p>

          <Link to="/register" className="cta-btn">
            Get Started Today <FiArrowRight />
          </Link>

          <div className="cta-features">
            <span className="cta-feature">
              <img src={secureIcon} alt="" className="cta-feature-icon" />
              Secure Workflows
            </span>

            <span className="cta-feature">
              <img src={roleIcon} alt="" className="cta-feature-icon" />
              Role-Based Access
            </span>

            <span className="cta-feature">
              <img src={trackingIcon} alt="" className="cta-feature-icon" />
              Real-Time Tracking
            </span>
          </div>

          <motion.button
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
            className="scroll-top-btn"
          >
            <FiArrowUp />
          </motion.button>
        </motion.section>
      </main>
    </div>
  );
}

export default LandingPage;
