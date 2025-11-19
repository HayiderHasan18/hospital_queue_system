import { useState } from "react";
import LoginForm from "./Login";
import SignupForm from "./SignUp";
import './Auth.css'
import doctorImage from "../../assets/Images/registrations.jpg";
export default function AuthMode() {
  const [showLogin, setShowLogin] = useState(true);

  const handleToggleForm = () => setShowLogin(!showLogin);
  return (
    <div className="auth-modal-overlay">
      <div className="auth-card">
        {/* Left Section */}
        <div
          className="auth-image-section"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${doctorImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="text-content">
            <h2>{showLogin ? "Welcome Back" : "Join Our System"}</h2>
            <p>
              {showLogin
                ? " Please Login with your credentials to use our Hospital Queue Management System"
                : "Register now to get started with our hospital queue management system."}
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="auth-form-section">
          {showLogin ? (
            <LoginForm onToggleForm={handleToggleForm} />
          ) : (
            <SignupForm onToggleForm={handleToggleForm} />
          )}
        </div>
      </div>
    </div>
  );
}
