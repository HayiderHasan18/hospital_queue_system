
import React from 'react';
import './queueStatus.css';
import { FaClock, FaUserFriends, FaCalendarAlt, FaIdCard } from 'react-icons/fa';

const QueueStatus = ({ data }) => {
  if (!data) return (
    <div className="queue-status">
      <h2 className="section-title">Your Queue Status</h2>
      <div className="loading-message">
        <p>No queue information available</p>
      </div>
    </div>
  );

  // Map status to display text
  const statusText = {
    'waiting': 'Waiting',
    'called': 'Called to Doctor',
    'in_progress': 'Consultation in Progress',
    'served': 'Consultation Completed'
  };

  return (
    <div className="queue-status">
      <h2 className="section-title">Your Queue Status</h2>

      <div className="queue-card">
        <div className="status-indicator">
          <FaClock className="watch-icon" />
          <span className={`status-text ${data.status}`}>
            {statusText[data.status] || data.status}
          </span>
        </div>
        <div className="queue-number">{data.queueNo}</div>
        <div className="queue-label">Your Queue Number</div>
      </div>

      <div className="status-grid">
        <div className="status-card">
          <div className="status-header">
            <FaIdCard className="status-icon" />
            <h3>Your Card Number</h3>
          </div>
          <div className="status-value">{data.cardNo || 'N/A'}</div>
        </div>

        <div className="status-card">
          <div className="status-header">
            <FaUserFriends className="status-icon" />
            <h3>Patients Ahead</h3>
          </div>
          <div className="status-value">{data.patientsAhead}</div>
        </div>

        <div className="status-card">
          <div className="status-header">
            <FaClock className="status-icon" />
            <h3>Estimated Visit</h3>
          </div>
          <div className="status-value">{data.estimatedVisit || 'Calculating...'}</div>
        </div>

        <div className="status-card">
          <div className="status-header">
            <FaCalendarAlt className="status-icon" />
            <h3>Arrival Time</h3>
          </div>
          <div className="status-value">{data.arrivalTime || 'N/A'}</div>
        </div>
      </div>
    </div>
  );
};

export default QueueStatus;