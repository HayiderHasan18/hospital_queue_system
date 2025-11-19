import React, { useState } from "react";
// Use environment variable for backend URL
const BACKEND_URL = import.meta.env.VITE_API_URL;
const SignUp = ({ onToggleForm }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    gender: "",
    role: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); 
  const [message, setMessage] = useState(""); 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); 
    setMessage(""); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    const {
      first_name,
      last_name,
      email,
      password,
      confirmPassword,
      gender,
      role,
    } = formData;

    // --- Frontend Validation ---
    if (!first_name) newErrors.first_name = "First name is required.";
    if (!last_name) newErrors.last_name = "Last name is required.";
    if (!email) newErrors.email = "Email is required.";
    else if (!email.includes("@"))
      newErrors.email = "Enter a valid email address.";

    if (!password) newErrors.password = "Password is required.";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";

    if (!confirmPassword)
      newErrors.confirmPassword = "Please confirm your password.";
    else if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";

    if (!gender) newErrors.gender = "Gender is required.";
    if (!role) newErrors.role = "Role is required.";
    // --- End Frontend Validation ---

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; 
    }

    setLoading(true);
    setMessage(""); 

    try {
      const API_URL = `${BACKEND_URL}/users/register`;

      
      const { confirmPassword: _, ...dataToSend } = formData;

      const response = await fetch(API_URL, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify(dataToSend), 
      });

      const result = await response.json(); 
      if (response.ok) {
        setMessage(result.message || "Signup successful! You can now log in.");
        
        setFormData({
          first_name: "",
          last_name: "",
          email: "",
          password: "",
          confirmPassword: "",
          gender: "",
          role: "",
        });
        setErrors({}); 
      } else {
        
        setMessage(result.message || "Signup failed. Please try again.");
        if (result.errors) {
          
          setErrors(result.errors);
        }
      }
    } catch (error) {
      
      console.error("Error during signup API call:", error);
      setMessage(
        "Network error. Could not connect to the server. Please try again later."
      );
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="auth-form-section">
      <h2>Sign Up</h2>
      
      {message && (
        <p
          className={`message ${
            message.includes("successful") ? "success" : "error"
          }`}
        >
          {message}
        </p>
      )}
      <form onSubmit={handleSubmit} className="form-grid">
        {/* First Name */}
        <div className="form-row">
          <div className="form-group">
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              value={formData.first_name}
              onChange={handleChange}
              className={errors.first_name ? "error" : ""}
            />
            {errors.first_name && (
              <p className="error-message">{errors.first_name}</p>
            )}
          </div>
          {/* Last Name */}
          <div className="form-group">
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              value={formData.last_name}
              onChange={handleChange}
              className={errors.last_name ? "error" : ""}
            />
            {errors.last_name && (
              <p className="error-message">{errors.last_name}</p>
            )}
          </div>
        </div>

        {/* Email */}
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

        {/* Password */}
        <div className="form-row">
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
          {/* Confirm Password */}
          <div className="form-group">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={errors.confirmPassword ? "error" : ""}
            />
            {errors.confirmPassword && (
              <p className="error-message">{errors.confirmPassword}</p>
            )}
          </div>
        </div>

        {/* Gender */}
        <div className="form-group">
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className={errors.gender ? "error" : ""}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender && <p className="error-message">{errors.gender}</p>}
        </div>

        {/* Role */}
        <div className="form-group">
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className={errors.role ? "error" : ""}
          >
            <option value="">Select Role</option>
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
            <option value="admin">Admin</option>
          </select>
          {errors.role && <p className="error-message">{errors.role}</p>}
        </div>

        <button type="submit" className="auth-button" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      <div className="toggle-link-container">
        Already have an account?{" "}
        <button onClick={onToggleForm} className="toggle-button">
          Login
        </button>
      </div>
    </div>
  );
};

export default SignUp;
