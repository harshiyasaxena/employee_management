import { useEffect, useState } from "react";
import "./AnnouncementsPage.css";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [target, setTarget] = useState("ALL");

  const fetchAnnouncements = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_BASE_URL}/api/announcements`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      setAnnouncements(data);
    } catch (error) {
      console.error("Failed to fetch announcements", error);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_BASE_URL}/api/announcements`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title,
            message,
            target,
          }),
        }
      );

      if (!response.ok) {
        throw new Error();
      }

      alert("Announcement posted successfully");

      setTitle("");
      setMessage("");
      setTarget("ALL");

      fetchAnnouncements();
    } catch (error) {
      console.error(error);
      alert("Failed to post announcement");
    }
  };

  return (
    <div className="announcements-page">
      <h1 className="page-title">Announcements</h1>

      <div className="announcements-grid">
        <div className="card announcement-form-card">
          <h2>Create Announcement</h2>

          <form className="form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              placeholder="Message"
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <select
              value={target}
              onChange={(e) => setTarget(e.target.value)}
            >
              <option>ALL</option>
              <option>EMPLOYEES</option>
              <option>TEAM_LEADS</option>
              <option>MANAGERS</option>
            </select>
            <input type="text" placeholder="Selected employee IDs (optional)" />
            <button type="submit">Post Announcement</button>
          </form>
        </div>

        <div className="card announcement-list-card">
          <h2>Previous Announcements</h2>

          <div className="announcements-list">
            {announcements.length > 0 ? (
              announcements.map((announcement) => (
                <div
                  key={announcement.id}
                  className="announcement-item"
                >
                  <h3>{announcement.title}</h3>

                  <p>{announcement.message}</p>

                  <small>
                    Target: {announcement.target}
                  </small>
                </div>
              ))
            ) : (
              <p>No announcements found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnnouncementsPage;