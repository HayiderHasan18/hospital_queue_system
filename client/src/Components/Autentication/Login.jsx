import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ onToggleForm }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;
    const newErrors = {};

    if (!email) newErrors.email = "Email is required.";
    else if (!email.includes("@")) newErrors.email = "Invalid email address.";

    if (!password) newErrors.password = "Password is required.";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const result = await res.json();

      if (res.ok) {
        const role = result.user.role?.toLowerCase();

        if (!role) {
          setMessage("Role not found in user data.");
          return;
        }

        // Store session for the user
        sessionStorage.setItem(`${role}_user`, JSON.stringify(result.user));
        sessionStorage.setItem("token", result.token);

        // Navigate to the respective dashboard
        navigate(`/dashboard/${role}`);

        // Reset form
        setFormData({ email: "", password: "" });
        setErrors({});
      } else {
        setMessage(result.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form-section">
      <h2>Log In</h2>
      {message && (
        <p
          className={`message ${
            message.includes("successful") ? "success" : "error"
          }`}
        >
          {message}
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? "error" : ""}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>

        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? "error" : ""}
          />
          {errors.password && (
            <p className="error-message">{errors.password}</p>
          )}
        </div>

        <div className="forgot-password-link">
          <a href="#">Forgot password?</a>
        </div>

        <button type="submit" className="auth-button" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="toggle-link-container">
        Don’t have an account?{" "}
        <button onClick={onToggleForm} className="toggle-button">
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Login;
