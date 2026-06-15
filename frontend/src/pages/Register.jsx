import { useState } from "react";
import { motion } from "framer-motion";
import LottieModule from "lottie-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import teamAnimation from "../animations/business-team.json";

import "../styles/register.css";
import { registerUser } from "../api/auth";

const Lottie = LottieModule.default || LottieModule;

function Register() {
  const navigate = useNavigate();
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

  try {
    const response = await registerUser(formData);

    alert("Registration Successful");

    navigate("/login");
  } catch (error) {
    console.error(error);

    alert(
      error.response?.data ||
      "Registration Failed"
    );
  }
};

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
          <div className="register-animation-wrapper">
            <Lottie
              animationData={teamAnimation}
              loop={true}
              className="register-lottie"
            />
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
                <h2>Register</h2>

                <p>
                  Create your workforce account
                </p>
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

                <button
                  type="submit"
                  className="register-submit-btn"
                >
                  Register
                </button>

                <div className="divider">
                  <span>or</span>
                </div>

                <p className="register-footer-text">
                  Already have an account?{" "}
                  <Link to="/login">
                    Login
                  </Link>
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

