import React from 'react';
import './PatientQueue.css';

const PatientQueue = ({ 
  patients, 
  onCallPatient, 
  onStartConsultation,
  currentPatientId,
  onMarkServed,
  isActionInProgress
}) => {
  // Check if there's an active patient (called or in-progress)
  const hasActivePatient = patients.some(p => 
    p.status === 'called' || p.status === 'in_progress'
  );

  return (
    <div className="patient-queue">
      <h2>Patient Queue</h2>
      
      <div className="queue-table-container">
        <table className="queue-table">
          <thead>
            <tr>
              <th>Queue #</th>
              <th>Patient</th>
              <th>Age</th>
              <th>Address</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr 
                key={patient.id} 
                className={patient.id === currentPatientId ? 'current-patient-row' : ''}
              >
                <td>{patient.queueNo}</td>
                <td>
                  <div className="patient-info">
                    <div className="patient-name">{patient.name}</div>
                    <div className="patient-contact">{patient.phone}</div>
                  </div>
                </td>
                <td>{patient.age}</td>
                <td>{patient.address}</td>
                <td>
                  <span className={`status-badge ${patient.status}`}>
                    {patient.status === 'waiting' ? 'Waiting' : 
                     patient.status === 'called' ? 'Called' : 
                     patient.status === 'in_progress' ? 'In Progress' : 
                     'Served'}
                  </span>
                </td>
                <td>
                  {patient.status === 'waiting' && (
                    <button  className='call-button'
                      onClick={() => onCallPatient(patient)}
                      disabled={isActionInProgress || hasActivePatient}
                    >
                      Call Patient
                    </button>
                  )}
                  {patient.status === 'called' && (
                    <button className='starConseltation'
                      onClick={() => onStartConsultation(patient)}
                      disabled={isActionInProgress || (currentPatientId && patient.id !== currentPatientId)}
                    >
                      Start Consultation
                    </button>
                  )}
                  {patient.status === 'in_progress' && (
                    <button className='Consultation-Started' disabled>Consultation Started</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {currentPatientId && (
        <div className="mark-served-wrapper">
          <button 
            className="mark-served-button" 
            onClick={onMarkServed}
            disabled={isActionInProgress}
          >
            Mark as Served
          </button>
        </div>
      )}
    </div>
  );
};

export default PatientQueue;