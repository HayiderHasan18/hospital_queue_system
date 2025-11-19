
import React from 'react';
import './servedToday.css';

const ServedToday = ({ patients }) => {
  return (
    <div className="served-today">
      <h2>Served Today</h2>
      <div className="served-list">
        {patients.length === 0 ? (
          <div className="empty-served">
            No patients served yet today
          </div>
        ) : (
          patients.map((patient, index) => (
            <div key={index} className="served-patient">
              <div className="patient-info">
                <div className="patient-name">{patient.name}</div>
                <div className="patient-details">
                  <span className="queue-id">Queue: {patient.queueNo}</span>
                  <span className="served-time">Served at: {patient.servedTime}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ServedToday;