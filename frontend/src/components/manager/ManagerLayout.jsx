import { Outlet } from "react-router-dom";
import ManagerTopbar from "./ManagerTopbar";
import Footer from "../common/Footer";
import "./ManagerLayout.css";
import bgPublic from "../../images/manager_bg.jpg";

function ManagerLayout() {
  return (
    <div
      className="manager-layout"
      style={{
        backgroundImage: `url(${bgPublic})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <ManagerTopbar />
      <div className="manager-content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default ManagerLayout;
