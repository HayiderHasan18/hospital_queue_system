import React from "react";
import { useInView } from "react-intersection-observer";
import "./Benefit.css";
import PatientImage from "../../assets/Images/patients.png";
import AdminImage from "../../assets/Images/admin.png";
import DoctorImage from "../../assets/Images/doctors.png";
import TransparencyImage from "../../assets/Images/transparency.jpg"; 
import SecurityImage from "../../assets/Images/security.jpg"; // 

const Benefits = () => {
  const [sectionRef] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });
  const [patientRef, patientInView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });
  const [adminRef, adminInView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });
  const [doctorRef, doctorInView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });
  const [transparencyRef, transparencyInView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });
  const [securityRef, securityInView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <section className="benefits-section" ref={sectionRef}>
      <div className="container">
        <div className="section-Headers">
          <h1 className="fade-in always-show" id="benefits">
            Benefits For All
          </h1>

          <p className="section-subtitle">
            Our system empowers every stakeholder in the healthcare
            journey—patients, staff, and doctors— with transparency, efficiency,
            and ease of use.
          </p>
        </div>

        <div
          ref={patientRef}
          className={`benefit-block ${patientInView ? "fade-in-up" : ""}`}
        >
          <div className="benefit-content">
            <div className="benefit-image-container">
              <img
                src={PatientImage}
                alt="Patient benefits"
                className="benefit-image"
              />
            </div>
            <div className="benefit-text">
              <h3>For Patients</h3>
              <p className="benefit-subtitle">
                Enhancing patient experience with reduced waiting and clear
                communication.
              </p>
              <ul>
                <li>No more crowding or asking "when is my turn?"</li>
                <li>Real-time updates reduce stress and waiting time</li>
                <li>Transparent queue management system</li>
              </ul>
            </div>
          </div>
        </div>

        <div
          ref={adminRef}
          className={`benefit-block ${adminInView ? "fade-in-up" : ""}`}
        >
          <div className="benefit-content image-right">
            <div className="benefit-image-container">
              <img
                src={AdminImage}
                alt="Admin benefits"
                className="benefit-image"
              />
            </div>
            <div className="benefit-text">
              <h3>For Admin</h3>
              <p className="benefit-subtitle">
                Empowering admins with tools to manage patient flow more
                effectively.
              </p>
              <ul>
                <li>Streamlined patient management</li>
                <li>Automated queue organization</li>
                <li>Reduced admin workload</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Doctor Block */}
        <div
          ref={doctorRef}
          className={`benefit-block ${doctorInView ? "fade-in-up" : ""}`}
        >
          <div className="benefit-content">
            <div className="benefit-image-container">
              <img
                src={DoctorImage}
                alt="Doctor benefits"
                className="benefit-image"
              />
            </div>
            <div className="benefit-text">
              <h3>For Doctors</h3>
              <p className="benefit-subtitle">
                Giving doctors more control and insight into their appointment
                schedules.
              </p>
              <ul>
                <li>Quick access to patient queue status</li>
                <li>Better planning of consultation time</li>
                <li>Improved communication with staff</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Improved Transparency Block */}
        <div
          ref={transparencyRef}
          className={`benefit-block ${transparencyInView ? "fade-in-up" : ""}`}
        >
          <div className="benefit-content image-right">
            <div className="benefit-image-container">
              <img
                src={TransparencyImage}
                alt="Improved Transparency"
                className="benefit-image"
              />
            </div>
            <div className="benefit-text">
              <h3>Improved Transparency</h3>
              <p className="benefit-subtitle">
                Keeping everyone informed every step of the way.
              </p>
              <ul>
                <li>Patients see real-time queue status</li>
                <li>Doctors track appointments with clarity</li>
                <li>Admins access live system feedback</li>
              </ul>
            </div>
          </div>
        </div>

        
        <div
          ref={securityRef}
          className={`benefit-block ${securityInView ? "fade-in-up" : ""}`}
        >
          <div className="benefit-content">
            <div className="benefit-image-container">
              <img
                src={SecurityImage}
                alt="Enhanced Security"
                className="benefit-image"
              />
            </div>
            <div className="benefit-text">
              <h3>Enhanced Security</h3>
              <p className="benefit-subtitle">
                Protecting patient data with advanced security protocols.
              </p>
              <ul>
                <li>Secure login and role-based access</li>
                <li>Encrypted data storage</li>
                <li>Compliant with healthcare regulations</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
