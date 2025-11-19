import React, { useState } from "react";
import './header.css'
import { useNavigate } from 'react-router-dom';
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
const navigate = useNavigate();
  const toggleMenu = () => setMenuOpen(!menuOpen);

return (
  <header>
    <div className="header-container">
      <div className="logo">Hospital Queue Management System</div>

      <button className="hamburger" onClick={toggleMenu}>
        {menuOpen ? "✕" : "☰"}
      </button>

      <div className={`nav-wrapper ${menuOpen ? "open" : ""}`}>
        <nav>
          <a href="#home" onClick={() => setMenuOpen(false)}>
            Home
          </a>
          <a href="#features" onClick={() => setMenuOpen(false)}>
            Features
          </a>
          <a href="#benefits" onClick={() => setMenuOpen(false)}>
            Benifits
          </a>
          <a href="#about" onClick={() => setMenuOpen(false)}>
            About 
          </a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>
            Contact
          </a>
        </nav>
        <div className="button-group">
          <button className="btn-primary" onClick={() => navigate('auth')}>
         Sign Up
        </button>
        </div>
      </div>
    </div>
  </header>
);
};

export default Header;
