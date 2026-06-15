import "./ManagerDashboard.css";
import {
  FiUsers,
  FiList,
  FiCheckCircle,
  FiClock,
  FiAlertTriangle,
  FiTrendingUp,
} from "react-icons/fi";
import { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

function StatCard({ title, value, color, icon }) {
  return (
    <div
      className="stat-card"
      style={{
        borderColor: color,
        "--card-tint": color,
      }}
    >
      <div className="stat-bg-icon">{icon}</div>

      <div className="stat-icon" style={{ color }}>
        {icon}
      </div>

      <div className="stat-value" style={{ color }}>
        {value}
      </div>

      <div className="stat-title">{title}</div>
    </div>
  );
}

const attendanceData = [
  { month: "Jan", present: 18, late: 3, absent: 1 },
  { month: "Feb", present: 20, late: 2, absent: 0 },
  { month: "Mar", present: 19, late: 4, absent: 1 },
  { month: "Apr", present: 22, late: 1, absent: 1 },
  { month: "May", present: 21, late: 2, absent: 1 },
  { month: "Jun", present: 23, late: 1, absent: 0 },
];

function ManagerDashboard() {
  const [activeIndex, setActiveIndex] = useState(0);

  const [stats, setStats] = useState({
    totalEmployees: 0,
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    presentEmployees: 0,
    completionRate: 0,
    overdueTasks: 0,
  });

  const taskData = [
    {
      name: "Completed",
      value: stats.completedTasks,
      color: "#16a34a",
    },
    {
      name: "Pending",
      value: stats.pendingTasks,
      color: "#f59e0b",
    },
    {
    name: "Overdue",
    value: stats.overdueTasks,
    color: "#dc2626",
  },
  ];

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:8080/api/dashboard/stats",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch dashboard stats");
        }

        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="page-title">Overview</h1>

      <div className="stats-grid">
        <StatCard
          title="Total Employees"
          value={stats.totalEmployees}
          color="#2563eb"
          icon={<FiUsers />}
        />

        <StatCard
          title="Total Tasks"
          value={stats.totalTasks}
          color="#7c3aed"
          icon={<FiList />}
        />

        <StatCard
          title="Completed Tasks"
          value={stats.completedTasks}
          color="#16a34a"
          icon={<FiCheckCircle />}
        />

        <StatCard
          title="Pending Tasks"
          value={stats.pendingTasks}
          color="#f59e0b"
          icon={<FiClock />}
        />

        <StatCard
          title="Overdue Tasks"
          value={stats.overdueTasks}
          color="#dc2626"
          icon={<FiAlertTriangle />}
        />

        <StatCard
          title="Completion Rate"
          value={`${Math.round(stats.completionRate)}%`}
          color="#d1c410"
          icon={<FiTrendingUp />}
        />
      </div>

      <div className="section-grid">
        <div className="panel">
          <h2>Tasks & Completion Rate</h2>

          <div className="task-chart-wrapper">
            <div className="task-chart-box">
              <ResponsiveContainer width="100%" height={320}>
                <PieChart>
                  <Pie
                    data={taskData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={75}
                    outerRadius={105}
                    paddingAngle={3}
                    cursor="pointer"
                    activeIndex={activeIndex}
                    onMouseEnter={(_, index) => setActiveIndex(index)}
                    onMouseLeave={() => setActiveIndex(null)}
                  >
                    {taskData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                        style={{
                          transform:
                            activeIndex === index
                              ? "translateY(-4px)"
                              : "translateY(0px)",
                          transition: "transform 0.2s ease",
                        }}
                      />
                    ))}
                  </Pie>

                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>

              <div className="donut-center-text">
                <div className="donut-center-value">
                  {stats.totalTasks}
                </div>
                <div className="donut-center-label">Total Tasks</div>
              </div>
            </div>

            <div className="task-insight-box">
              <div className="task-insight-card info">
                <h3>Task Status</h3>
                <p>Tasks are mostly on track</p>
              </div>

              <div className="task-insight-card accent">
                <h3>Due Soon</h3>
                <p>12 tasks are due in the next 3 days</p>
              </div>

              <div className="task-insight-card warning">
                <h3>Attention Needed</h3>
                <p>Overdue tasks should be reviewed today</p>
              </div>
            </div>
          </div>
        </div>

        <div className="panel">
          <h2>Attendance Overview</h2>

          <div className="attendance-chart-box">
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />

                <Line
                  type="monotone"
                  dataKey="present"
                  stroke="#16a34a"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />

                <Line
                  type="monotone"
                  dataKey="late"
                  stroke="#f59e0b"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />

                <Line
                  type="monotone"
                  dataKey="absent"
                  stroke="#dc2626"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManagerDashboard;