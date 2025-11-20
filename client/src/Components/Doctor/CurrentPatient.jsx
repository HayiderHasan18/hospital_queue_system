
import React, { useState, useEffect } from 'react';
import { FaUser, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import './currentPatient.css';

const CurrentPatient = ({ patient,  }) => {
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval;
    if (isActive) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  useEffect(() => {
    if (patient) {
      setIsActive(true);
      setTimer(0);
    } else {
      setIsActive(false);
    }
  }, [patient]);

  if (!patient) {
    return (
      <div className="current-patient">
        <div className="section-header">
          <h2 className="section-title">Current Patient</h2>
        </div>
        <div className="patient-placeholder">
          <div className="person-icon-container">
            <FaUser className="person-icon" />
          </div>
          <p className="placeholder-text">
            No patient currently being served. Click "Call Patient" to start.
          </p>
        </div>
      </div>
    );
  }

  // Format timer to MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <div className="current-patient">
      <div className="section-header">
        <h2 className="section-title">Current Patient</h2>
        
      </div>

      <div className="patient-card">
        <div className="avatar-circle">{patient.name.charAt(0)}</div>
        <div className="info">
          <h3>{patient.name}</h3>
          <p><span className="icon">#️⃣</span> Queue: {patient.queueNo}</p>
          <p><FaClock className="icon" /> Age: {patient.age}</p>
          <p><FaMapMarkerAlt className="icon" /> {patient.address}</p>
          <p><FaClock className="icon" /> Consultation Time: {formatTime(timer)}</p>
        </div>
      </div>
    </div>
  );
};
export default CurrentPatient;
