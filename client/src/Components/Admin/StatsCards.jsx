import React from 'react';
import './stat.css';

function StatsCards({ analyticsData = {} }) {
  return (
    <div className="stats-cards">
      <div className="stat-card">
        <div className="stat-card-header">
          <h4>Total Patients</h4>
          <span className="stat-card-icon">&#x1F464;</span>
        </div>
        <div className="stat-card-value">{analyticsData.total_patients || 0}</div>
        <div className="stat-card-description">In the system</div>
      </div>

      <div className="stat-card">
        <div className="stat-card-header">
          <h4>Served Today</h4>
          <span className="stat-card-icon">&#x2713;</span>
        </div>
        <div className="stat-card-value green">
          {analyticsData.served_today || 0}
        </div>
        <div className="stat-card-description">Patients served today</div>
      </div>

      <div className="stat-card">
        <div className="stat-card-header">
          <h4>Avg Wait Time</h4>
          <span className="stat-card-icon">&#x23F1;</span>
        </div>
        <div className="stat-card-value orange">
          {analyticsData.avg_wait_time ? 
            `${Math.round(analyticsData.avg_wait_time)} min` : 'N/A'}
        </div>
        <div className="stat-card-description">For served patients</div>
      </div>

      <div className="stat-card">
        <div className="stat-card-header">
          <h4>Active Doctors</h4>
          <span className="stat-card-icon">&#x1F4C8;</span>
        </div>
        <div className="stat-card-value">
          {analyticsData.active_doctors || 0}
        </div>
        <div className="stat-card-description">Currently available</div>
      </div>
    </div>
  );
}

export default StatsCards;