import { useState } from 'react';
import './doctorTable.css';

const DoctorTable = ({ doctors = [], patients = [] }) => {
  const [viewingDoctor, setViewingDoctor] = useState(null);

  return (
    <div className="doctor-table-container">
      <table className="doctor-table">
        <thead>
          <tr>
            <th>Doctor ID</th>
            <th>Name</th>
            <th>speciality</th>
            <th>Room</th>
            <th>Phone</th>
            <th>Number of Patients</th>
            <th>List of Patients</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map(doctor => (
            <tr key={doctor.id}>
              <td>{doctor.id}</td>
              <td>{doctor.name}</td>
              <td>{doctor.speciality}</td>
              <td>{doctor.room}</td>
              <td>{doctor.phone}</td>
              <td>{doctor.patient_count || 0}</td>
              <td>
                <button
                  className={`view-btn ${doctor.patient_count === 0 ? 'empty' : ''}`}
                  onClick={() => setViewingDoctor(doctor)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {viewingDoctor && (
        <div className="patient-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h4>{viewingDoctor.name}'s Patients</h4>
              <button onClick={() => setViewingDoctor(null)}>×</button>
            </div>
            <div className="modal-body">
              {patients.filter(p => p.assignedDoctor === viewingDoctor.name).length > 0 ? (
                <table className="patient-list">
                  <thead>
                    <tr>
                      <th>Patient ID</th>
                      <th>Name</th>
                      <th>Arrival Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patients
                      .filter(p => p.assignedDoctor === viewingDoctor.name)
                      .map(patient => (
                        <tr key={patient.id}>
                          <td>{patient.id}</td>
                          <td>{patient.name}</td>
                          <td>{patient.arrival_time || 'N/A'}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              ) : (
                <p className="no-patients">No patients assigned</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default DoctorTable;