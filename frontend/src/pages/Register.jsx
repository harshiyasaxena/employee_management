import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import LottieModule from "lottie-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import registerIcon from "../images/register_icon.png";
import teamAnimation from "../animations/business-team.json";

import "../styles/register.css";
import { registerUser } from "../api/auth";

const Lottie = LottieModule.default || LottieModule;

function Register() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await registerUser(formData);

      alert("Registration Successful");

      navigate("/login");
    } catch (error) {
      console.error(error);

      const message = error.response?.data || "Registration Failed";

      alert(message);

      if (message === "Email already exists") {
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="register-page">
      <div className="register-container">
        {/* LEFT SIDE */}
        <motion.div
          className="register-left"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="typing-text">Build. Assign. Track. Grow.</div>
          <div className="register-animation-wrapper">
            <Lottie
              animationData={teamAnimation}
              loop={true}
              className="register-lottie"
            />
          </div>

          <div className="register-timeline">
            <div
              className={`timeline-item left ${
                activeStep === 0 ? "active" : ""
              }`}
            >
              <h3>Register Employee</h3>
              <p>Create your account with name, email, and department.</p>
            </div>

            <div
              className={`timeline-item right ${
                activeStep === 1 ? "active" : ""
              }`}
            >
              <h3>Login Securely</h3>
              <p>Sign in using your credentials and access the dashboard.</p>
            </div>

            <div
              className={`timeline-item left ${
                activeStep === 2 ? "active" : ""
              }`}
            >
              <h3>Receive Tasks</h3>
              <p>Managers assign work based on role and department.</p>
            </div>

            <div
              className={`timeline-item right ${
                activeStep === 3 ? "active" : ""
              }`}
            >
              <h3>Track Attendance</h3>
              <p>Check in, check out, and monitor your work progress.</p>
            </div>
          </div>
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          className="register-right"
          initial={{ opacity: 0, x: 40, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="animated-border">
            <div className="docflow-register-card">
              <div className="register-header">
                <div className="register-title-row">
                  <img
                    src={registerIcon}
                    alt="Register Icon"
                    className="register-title-icon"
                  />
                  <h2>Register</h2>
                </div>

                <p>Create your workforce account</p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Full Name *</label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Email *</label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Password *</label>

                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Department *</label>

                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    placeholder="Enter your department"
                    required
                  />
                </div>

                {loading && (
                  <div className="register-loader-overlay">
                    <div className="loader"></div>
                  </div>
                )}

                <button
                  type="submit"
                  className="register-submit-btn"
                  disabled={loading}
                >
                  Register
                </button>

                <div className="divider">
                  <span>or</span>
                </div>

                <p className="register-footer-text">
                  Already have an account? <Link to="/login">Login</Link>
                </p>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Register;
