import React, { useState, useEffect } from "react";
import "./HeroSection.css";
import { useNavigate } from 'react-router-dom';

import image1 from "../../assets/images/Hospital.jpg";
import image from "../../assets/Images/image1.jpg";
import image2 from "../../assets/images/image2.jpg";
import image3 from "../../assets/images/image3.jpg";
import image4 from "../../assets/images/image4.jpg";
import image5 from "../../assets/images/image5.jpg";

const slides = [
  {
    image: image1,
    title: "Welcome to Our QueueCare",
    description:
      "A smart and efficient hospital queue management system designed to reduce wait times, organize patient flow, and improve service for everyone.",
    accent: "QueueCare",
    name: "Experience Seamless Care",
    role: "Hospital Queue System",
    profession: "Fast | Smart | Organized",
  },
  {
    image: image,
    title: "Real-Time Monitoring and Updates",
    description:
      "The system provides real-time monitoring across all interfaces, ensuring everything updates live.",
    accent: "Updates",
    name: "Ephrem Negash",
    role: "Chief Executive Officer(CEO)",
    profession: "Senior Fullstack Developer",
  },
  {
    image: image2,
    title: "Live Queue Display for Patients",
    description:
      "Patients can view their position and updates instantly on a digital display, improving transparency and reducing confusion.",
    accent: "Live Queue",
    name: "Hanan Kasaye",
    role: "Chief operational Officer(COO)",
    profession: null,
  },
  {
    image: image3,
    title: "Efficient Doctor Queue Management",
    description:
      "Doctors receive an organized list of their assigned patients and can easily call the next patient.",
    accent: "Management",
    name: "Bernabas Negash",
    role: "Product Manger",
    profession: "Backend Developer and Scrum Mastert",
  },
  {
    image: image4,
    title: "Simple and Secure Patient Registration",
    description:
      "Patients can easily sign up and take a unique queue number, simplifying the registration process.",
    accent: "Registration",
    name: "Ayne Abrham",
    role: "Fulstack Developer",
    profession: "Development Team Lead",
  },
  {
    image: image5,
    title: "Reduce Stress and Enhance Experience",
    description:
      "By managing the chaos of waiting rooms, the system reduces stress and supports better patient care.",
    accent: "Reduce Stress",
    name: "Merid Mulugeta",
    role: "Marketing Development Manager",
    profession: "Digitalization Officer",
  },
];

const Hero = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const currentSlide = slides[currentSlideIndex];

  const handleGetStarted = () => {
    navigate("/auth");
  };

  return (
    <section className="hero-section" id="home">
      <div className="hero-content">
        <div className="hero-text-container">
          <h1 className="hero-title">
            {currentSlide.title
              .split(currentSlide.accent)
              .map((part, index, array) => (
                <React.Fragment key={index}>
                  {part}
                  {index < array.length - 1 && (
                    <span className="title-accent">{currentSlide.accent}</span>
                  )}
                </React.Fragment>
              ))}
          </h1>
          <p className="hero-description">{currentSlide.description}</p>

          <div className="hero-buttons">
            <button onClick={handleGetStarted} className="btn-pri">
              Get Started Now
            </button>
          </div>
        </div>

        <div className="hero-image-wrapper">
          <img
            key={currentSlide.image}
            src={currentSlide.image}
            alt={currentSlide.title}
            className="hero-image fade-in-image"
          />
          <div className="image-description-container fade-in-text">
            {currentSlide.name ? (
              <p className="image-description-title">{currentSlide.name}</p>
            ) : (
              <p className="image-description-title">About this image:</p>
            )}
            {(currentSlide.role || currentSlide.profession) && (
              <div className="image-details">
                {currentSlide.role && <p>{currentSlide.role}</p>}
                {currentSlide.profession && <p>{currentSlide.profession}</p>}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
export default Hero;
