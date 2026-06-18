import { useState } from "react";
import { motion } from "framer-motion";
import LottieModule from "lottie-react";
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  InputAdornment,
  IconButton,
  Divider,
} from "@mui/material";
import { Link } from "react-router-dom";
import loginIcon from "../images/login_form.png";

import {
  Visibility,
  VisibilityOff,
  Login as LoginIcon,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

import loginAnimation from "../animations/Login_animate.json";

import "../styles/login.css";
import { loginUser } from "../api/auth";

const Lottie = LottieModule.default || LottieModule;

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  console.log("Lottie:", Lottie);
  console.log("Animation:", loginAnimation);

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
      const response = await loginUser(formData);

      const token = response.data.token;
      const role = response.data.role;
      const email = response.data.email;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("email", email);

      alert("Login Successful!");

      if (role === "MANAGER") {
        navigate("/manager");
      } else {
        navigate("/employee");
      }
    } catch (error) {
      console.error(error);

      alert(error.response?.data || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="login-page">
      {/* Background blobs */}
      <Box className="login-bg-shape login-bg-one" />
      <Box className="login-bg-shape login-bg-two" />
      <Box className="login-bg-shape login-bg-three" />

      <Container maxWidth="xl">
        <Stack
          minHeight="calc(100vh - 160px)"
          direction={{ xs: "column", lg: "row" }}
          alignItems="center"
          justifyContent="center"
          spacing={6}
          py={4}
        >
          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="login-left"
          >
            <div className="login-animation-wrapper">
              <Lottie
                animationData={loginAnimation}
                loop={true}
                className="login-lottie"
              />
            </div>
          </motion.div>

          {/* RIGHT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="login-right"
          >
            <div className="animated-border">
              <div className="login-border-wrapper">
                <motion.div
                  className="docflow-login-card"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="login-header">
                    <div className="login-title-row">
                      <img
                        src={loginIcon}
                        alt="Login"
                        className="login-title-icon"
                      />

                      <h2>Login</h2>
                    </div>

                    <p>Enter your credentials to continue</p>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label>Email *</label>

                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                      />
                    </div>

                    <div className="form-group">
                      <label>Password *</label>

                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                      />
                    </div>

                    <div className="forgot-row">
                      <a href="/">Forgot Password?</a>
                    </div>

                    {loading && (
                      <div className="login-loader-overlay">
                        <div className="loader"></div>
                      </div>
                    )}
                    <button
                      type="submit"
                      className="login-submit-btn"
                      disabled={loading}
                    >
                      Login
                    </button>

                    <div className="divider">
                      <span>or</span>
                    </div>

                    <p className="register-text">
                      Don't have an account?{" "}
                      <Link to="/register">Register</Link>
                    </p>
                  </form>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </Stack>
      </Container>
    </Box>
  );
}

export default Login;
