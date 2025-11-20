
import React from 'react';
import './doctorAssign.css';
import { FaUserMd, FaDoorOpen, FaStethoscope } from 'react-icons/fa';

const DoctorAssignment = ({ data }) => {
  if (!data) return (
    <div className="doctor-assignment">
      <div className="section-header">
        <h2 className="section-title">Doctor Assignment</h2>
      </div>
      <div className="loading-message">
        <p>No doctor assigned yet</p>
      </div>
    </div>
  );

  return (
    <div className="doctor-assignment">
      <div className="section-header">
        <h2 className="section-title">Doctor Assignment</h2>
      </div>
      
      <div className="doctor-info">
        <div className="info-item">
          <div className="info-label">
            <FaUserMd className="info-icon" />
            <span>Doctor</span>
          </div>
          <div className="info-value">{data.doctor || 'Not assigned'}</div>
        </div>
        
        <div className="info-item">
          <div className="info-label">
            <FaDoorOpen className="info-icon" />
            <span>Room Number</span>
          </div>
          <div className="info-value">{data.room || 'Not assigned'}</div>
        </div>
      </div>
    </div>
  );
};

export default DoctorAssignment;