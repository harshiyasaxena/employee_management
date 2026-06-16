import { useEffect, useState } from "react";
import "./TasksPage.css";
import tasksImage from "../../images/assign_task.png";
import tasksBg from "../../images/assign_bg.jpg";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("LOW");
  const [assignedToIds, setAssignedToIds] = useState([]);
  const [assignToAll, setAssignToAll] = useState(false);

  const token = localStorage.getItem("token");
  const currentUserEmail = localStorage.getItem("email");

  useEffect(() => {
    fetchEmployees();
    fetchTasks();
  }, []);

  const fetchEmployees = async () => {
    const res = await fetch(`${API_BASE_URL}/api/employees`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setEmployees(data);
  };

  const fetchTasks = async () => {
    const res = await fetch(`${API_BASE_URL}/api/tasks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setTasks(data);
  };

  const deleteTask = async (id) => {
    try {
      await fetch(
        `${API_BASE_URL}/api/tasks/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchTasks();
    } catch (error) {
      console.error("Failed to delete task", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentUser = employees.find((emp) => emp.email === currentUserEmail);

    if (!currentUser) {
      alert("Logged-in user not found");
      return;
    }

    const payload = {
      title,
      description,
      priority,
      deadline,
      assignedById: currentUser.id,
      assignToAll,
      assignedToId: assignToAll
        ? null
        : assignedToIds.length === 1
          ? Number(assignedToIds[0])
          : null,
      assignedToIds: assignToAll ? [] : assignedToIds.map(Number),
    };

    const res = await fetch(`${API_BASE_URL}/api/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      alert("Task assigned successfully");
      setTitle("");
      setDescription("");
      setDeadline("");
      setPriority("LOW");
      setAssignedToIds([]);
      setAssignToAll(false);
      fetchTasks();
    } else {
      alert("Failed to assign task");
    }
  };

  const getDisplayStatus = (task) => {
    const today = new Date();

    if (
      task.status !== "COMPLETED" &&
      new Date(task.deadline) < today
    ) {
      return "OVERDUE";
    }

    return task.status;
  };

  return (
    <div className="tasks-page">
      <h1 className="page-title">Tasks</h1>

      <div className="tasks-grid">
        {/* ASSIGN TASK FORM */}
        <div className="card tasks-form-card">
          <h2>Assign Task</h2>

          <form className="form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Task Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              placeholder="Description"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />

            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="LOW">LOW</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="HIGH">HIGH</option>
              <option value="CRITICAL">CRITICAL</option>
            </select>

            {!assignToAll && (
              <div className="employee-checkbox-list">
                <div className="employee-list-title">Select Employees</div>

                {employees
                  .filter((emp) => emp.role === "EMPLOYEE")
                  .map((emp) => (
                    <label key={emp.id} className="employee-checkbox-item">
                      <input
                        type="checkbox"
                        checked={assignedToIds.includes(String(emp.id))}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setAssignedToIds([
                              ...assignedToIds,
                              String(emp.id),
                            ]);
                          } else {
                            setAssignedToIds(
                              assignedToIds.filter(
                                (id) => id !== String(emp.id)
                              )
                            );
                          }
                        }}
                      />
                      <span>
                        {emp.name} ({emp.department})
                      </span>
                    </label>
                  ))}
              </div>
            )}
            <label
              style={{ display: "flex", gap: "8px", alignItems: "center" }}
            >
              <input
                type="checkbox"
                checked={assignToAll}
                onChange={(e) => setAssignToAll(e.target.checked)}
              />
              Assign to all employees
            </label>

            <button type="submit">Assign Task</button>
          </form>
        </div>

        {/* ASSIGNED TASKS */}
        <div className="card tasks-list-card">
          <div className="table-header ">
            <div className="title-with-image">
              <img src={tasksImage} alt="Tasks" className="tasks-image" />
              <h2>Assigned Tasks</h2>
            </div>
          </div>

          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>Task Title</th>
                  <th>Priority</th>
                  <th>Due Date</th>
                  <th>Assigned To</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.id}>
                    <td>{task.title}</td>
                    <td>
                      <span
                        className={`priority-badge ${task.priority?.toLowerCase()}`}
                      >
                        {task.priority}
                      </span>
                    </td>
                    <td>{task.deadline}</td>
                    <td>{task.assignedTo?.name}</td>

                    <td>
                      <span
                        className={`status-badge ${getDisplayStatus(task).toLowerCase()}`}
                      >
                        {getDisplayStatus(task)}
                      </span>
                    </td>

                    <td>
                      <button
                        className="delete-btn"
                        onClick={() => deleteTask(task.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TasksPage;
