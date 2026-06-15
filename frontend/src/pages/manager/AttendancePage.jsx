import { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./AttendancePage.css";

function AttendancePage() {
  const [rows, setRows] = useState([]);

  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const fetchAttendance = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      "http://localhost:8080/api/attendance",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    setRows(data);
  } catch (error) {
    console.error(
      "Failed to fetch attendance",
      error
    );
  }
};

useEffect(() => {
  fetchAttendance();
}, []);

  const handleRowClick = (employee) => {
    setSelectedEmployee(employee);
  };

  const selectedEmployeeRows = selectedEmployee
    ? rows.filter((row) => row.employee?.id === selectedEmployee.id)
    : [];

  const presentCount = selectedEmployeeRows.filter(
    (r) => r.status === "PRESENT"
  ).length;

  const lateCount = selectedEmployeeRows.filter(
    (r) => r.status === "LATE"
  ).length;

  const absentCount = selectedEmployeeRows.filter(
    (r) => r.status === "ABSENT"
  ).length;

  const chartData = [
    { name: "Present", value: presentCount },
    { name: "Late", value: lateCount },
    { name: "Absent", value: absentCount },
  ];

  const COLORS = ["#16a34a", "#f59e0b", "#dc2626"];

  return (
    <div className="attendance-page">
      <h1 className="page-title">Attendance</h1>

      <div className="attendance-layout">
        <div className="card attendance-table-card">
          <h2>Employee Attendance</h2>

          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Date</th>
                  <th>Check In</th>
                  <th>Check Out</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr
                    key={row.id}
                    className="clickable-row"
                    onClick={() => handleRowClick(row.employee)}
                  >
                    <td>{row.employee?.name}</td>
                    <td>{row.date}</td>
                    <td>{row.checkIn || "-"}</td>
                    <td>{row.checkOut || "-"}</td>
                    <td>
                      <span className={`status-badge ${row.status.toLowerCase()}`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card chart-card">
          <h2>
            {selectedEmployee
              ? `${selectedEmployee.name}'s Attendance`
              : "Click an employee row"}
          </h2>

          {selectedEmployee ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={4}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="chart-placeholder">Select a row to view chart</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AttendancePage;