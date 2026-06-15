import { useState, useEffect } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "./EmployeesPage.css";
import employeeIcon from "../../images/emp_list.png";
import employeeBg from "../../images/emp_bg.jpg";
import addEmployeeIcon from "../../images/add_emp.png";

function EmployeesPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [deptFilter, setDeptFilter] = useState("ALL");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [employees, setEmployees] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    department: "",
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:8080/api/employees",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      setEmployees(data);
    } catch (error) {
      console.error("Failed to fetch employees", error);
    }
  };

  const deleteEmployee = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await fetch(
        `http://localhost:8080/api/employees/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchEmployees();
    } catch (error) {
      console.error("Failed to delete employee", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.email.toLowerCase().includes(search.toLowerCase()) ||
      emp.department.toLowerCase().includes(search.toLowerCase());

    const matchesRole = roleFilter === "ALL" || emp.role === roleFilter;
    const matchesDept = deptFilter === "ALL" || emp.department === deptFilter;

    return matchesSearch && matchesRole && matchesDept;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:8080/api/employees",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            department: formData.department,
            role: formData.role,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add employee");
      }

      fetchEmployees();

      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
        department: "",
      });

      alert("Employee added successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to add employee");
    }
  };

  return (
    <div className="employees-page">
      <h1 className="page-title">Employees</h1>

      <div className="employees-grid">
        {/* ADD EMPLOYEE FORM */}
        <div className="card employees-form-card">
          <div className="section-title center-title">
            <img src={addEmployeeIcon} alt="Add Employee Icon" className="title-icon" />
            <h2>Add Employee</h2>
          </div>

          <form className="form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />

            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="eye-btn"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>

            <div className="password-field">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <button
                type="button"
                className="eye-btn"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                aria-label={
                  showConfirmPassword ? "Hide confirm password" : "Show confirm password"
                }
              >
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="">Select Role</option>
              <option value="EMPLOYEE">Employee</option>
              <option value="TEAM_LEAD">Team Lead</option>
              <option value="MANAGER">Manager</option>
            </select>

            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
            >
              <option value="">Select Department</option>
              <option value="Software">Software</option>
              <option value="IPC">IPC</option>
            </select>

            <button type="submit">Add Employee</button>
          </form>
        </div>

        {/* EMPLOYEE LIST */}
        <div
          className="card employee-list-card"
          style={{ backgroundImage: `url(${employeeBg})` }}
        >
          <div className="table-header">
            <h2 className="title-with-icon">
              <img src={employeeIcon} alt="Employee Icon" className="title-icon" />
              Employee List
            </h2>

            <div className="filters-row">
              <input
                type="text"
                placeholder="Search by name, email, department..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-input"
              />

              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="filter-select"
              >
                <option value="ALL">All Roles</option>
                <option value="EMPLOYEE">Employees</option>
                <option value="TEAM_LEAD">Team Leads</option>
                <option value="MANAGER">Managers</option>
              </select>

              <select
                value={deptFilter}
                onChange={(e) => setDeptFilter(e.target.value)}
                className="filter-select"
              >
                <option value="ALL">All Departments</option>
                <option value="Software">Software</option>
                <option value="IPC">IPC</option>
              </select>
            </div>
          </div>

          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.length > 0 ? (
                  filteredEmployees.map((emp) => (
                    <tr key={emp.id}>
                      <td>{emp.name}</td>
                      <td>{emp.email}</td>
                      <td>{emp.department}</td>
                      <td>
                        <span className={`role-badge ${emp.role.toLowerCase()}`}>
                          {emp.role}
                        </span>
                      </td>
                      <td>
                        <button
                          className="delete-btn"
                          onClick={() => deleteEmployee(emp.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="no-data">
                      No employees found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeesPage;