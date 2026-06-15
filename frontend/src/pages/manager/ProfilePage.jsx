import { useEffect, useState } from "react";
import "./ProfilePage.css";

function ProfilePage() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    department: "",
    role: "",
    password: "",
  });

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:8080/api/employees/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      setProfile({
        ...data,
        password: "",
      });
    } catch (error) {
      console.error("Failed to fetch profile", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:8080/api/employees/profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(profile),
        }
      );

      if (response.ok) {
        alert("Profile updated successfully");

        fetchProfile();
      } else {
        alert("Failed to update profile");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="profile-page">
      <h1 className="page-title">My Profile</h1>

      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {profile.name?.charAt(0)}
          </div>

          <div>
            <h2>{profile.name}</h2>

            <span
              className={`role-badge ${profile.role?.toLowerCase()}`}
            >
              {profile.role}
            </span>
          </div>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <label>Name</label>

          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
          />

          <label>Email</label>

          <input
            type="email"
            value={profile.email}
            disabled
          />

          <label>Department</label>

          <input
            type="text"
            name="department"
            value={profile.department}
            onChange={handleChange}
          />

          <label>Role</label>

          <input
            type="text"
            value={profile.role}
            disabled
          />

          <label>New Password (optional)</label>

          <input
            type="password"
            name="password"
            value={profile.password}
            onChange={handleChange}
            placeholder="Leave blank to keep current password"
          />

          <button type="submit">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProfilePage;