import { Routes, Route } from "react-router-dom";

import PublicLayout from "./layouts/PublicLayout";
import ManagerLayout from "./components/manager/ManagerLayout";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";

import ManagerDashboard from "./pages/manager/ManagerDashboard";
import EmployeesPage from "./pages/manager/EmployeesPage";
import TasksPage from "./pages/manager/TasksPage";
import AnnouncementsPage from "./pages/manager/AnnouncementsPage";
import AttendancePage from "./pages/manager/AttendancePage";
import AnalyticsPage from "./pages/manager/AnalyticsPage";
import ProfilePage from "./pages/manager/ProfilePage";
import EmployeeDashboard from "./pages/EmployeeDashboard";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PublicLayout>
            <LandingPage />
          </PublicLayout>
        }
      />
      <Route
        path="/login"
        element={
          <PublicLayout>
            <Login />
          </PublicLayout>
        }
      />
      <Route
        path="/register"
        element={
          <PublicLayout>
            <Register />
          </PublicLayout>
        }
      />

      <Route path="/manager" element={<ManagerLayout />}>
        <Route index element={<ManagerDashboard />} />
        <Route path="employees" element={<EmployeesPage />} />
        <Route path="tasks" element={<TasksPage />} />
        <Route path="announcements" element={<AnnouncementsPage />} />
        <Route path="attendance" element={<AttendancePage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>

      <Route
        path="/employee"
        element={<EmployeeDashboard />}
      />
    </Routes>
  );
}

export default App;