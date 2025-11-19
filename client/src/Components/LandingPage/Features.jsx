import React from "react";
import { useInView } from "react-intersection-observer";
 import "./Feutures.css";

// Images
import RegistrationImg from "../../assets/Images/registration.jpg";
import MonitoringImg from "../../assets/Images/monitor.jpg";
import QueueImg from "../../assets/Images/queue icon.jpg";
import ScreenImg from "../../assets/Images/screen.jpg";
import StaffImg from "../../assets/Images/staff.jpg";
import Analytic from "../../assets/Images/analytic.jpg";

// Icons
import FormIcon from "../../assets/Images/form-icon.png";
import StatsIcon from "../../assets/Images/stats-icon.jpg";
import QueueIcon from "../../assets/Images/qeue-icon.jpg";
import ScreenIcon from "../../assets/Images/screen-icon.jpg";
import TeamIcon from "../../assets/Images/team-icon.jpg";
import AnalyticIcon from "../../assets/Images/analytic-icon.png";

const features = [
  {
    id: 1,
    title: "Patient Registration",
    description:
      "Simplify patient intake with quick, accurate, and secure digital registration processes.",
    img: RegistrationImg,
    icon: FormIcon,
  },
  {
    id: 2,
    title: "Real-time Monitoring",
    description:
      "Gain immediate insights into patient flow, wait times, and operational bottlenecks.",
    img: MonitoringImg,
    icon: StatsIcon,
  },
  {
    id: 3,
    title: "Digital Queueing",
    description:
      "Manage queues digitally, reducing physical crowding and improving patient comfort.",
    img: QueueImg,
    icon: QueueIcon,
  },
  {
    id: 4,
    title: "Display Screen",
    description: "Digital dashboard displays real-time updates of who’s next.",
    img: ScreenImg,
    icon: ScreenIcon,
  },
  {
    id: 5,
    title: "Staff Collaboration",
    description:
      "Removes silos—front desk, nurses, and doctors stay synced with better teamwork.",
    img: StaffImg,
    icon: TeamIcon,
  },
  {
    id: 6,
    title: "Analytics and Reporting",
    description:
      "Gain insights into patient flow, peak hours, and staff performance with comprehensive reports.",
    img: Analytic,
    icon: AnalyticIcon,
  },
];

const Features = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section className="features-section" ref={ref}>
      <div className="container">
        <h2 className="section-title" id="features">Key Features</h2>
        <p className="section-subtitle">
          QueueCare offers powerful features designed to optimize every aspect
          of patient management.
        </p>

        <div className={`features-grid ${inView ? "fade-in" : ""}`}>
          {features.map((feature, i) => (
            <div
              className="feature-card"
              key={feature.id}
              style={inView ? { animationDelay: `${i * 0.4 + 0.4}s` } : {}}
            >
              <div className="image-wrapper">
                <img src={feature.img} alt={feature.title} />
              </div>
              <div className="feature-content">
                <div className="title-with-icon">
                  <div className="icon-container">
                    <img src={feature.icon} alt={`${feature.title} icon`} />
                  </div>
                  <h3>{feature.title}</h3>
                </div>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
8