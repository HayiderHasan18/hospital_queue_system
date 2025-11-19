import React from 'react';
import './Navigation.css';

const NavigationTabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'patients', label: 'Patients' },
    { id: 'doctors', label: 'Doctors' },
    { id: 'analytics', label: 'Analytics' }
  ];

  return (
    <div className="navigation-tabs-container">
      <div className="navigation-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NavigationTabs;
