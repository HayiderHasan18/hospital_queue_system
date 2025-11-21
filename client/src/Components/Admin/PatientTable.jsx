import { useState } from 'react';
import './patientTable.css';

const PatientTable = ({ patients = [], doctors = [], queue = [], setPatients }) => {
const [assigningPatient, setAssigningPatient] = useState(null);
const [selectedDoctor, setSelectedDoctor] = useState('');

const BACKEND_URL = import.meta.env.VITE_API_URL;

const handleAssignDoctor = (patientId) => {
setAssigningPatient(patientId);
setSelectedDoctor('');
};

const confirmAssignment = async () => {
if (!selectedDoctor || !assigningPatient) return;
// Optimistic update
setPatients(prev =>
  prev.map(p =>
    p.id === assigningPatient
      ? { ...p, assignedDoctor: selectedDoctor, status: 'waiting' }
      : p
  )
);
setAssigningPatient(null);
setSelectedDoctor('');

try {
  const res = await fetch(`${BACKEND_URL}/admin/assign`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      patientId: assigningPatient,
      doctorName: selectedDoctor,
    }),
  });

  if (!res.ok) {
    console.error('Failed to assign doctor on backend');
    // Optional: rollback optimistic update if needed
  }
} catch (err) {
  console.error('Assignment error:', err);
  // Optional: rollback optimistic update if needed
}
};
return ( <div className="table-container"> <table className="patient-table"> <thead> <tr> <th>CardNum#</th> <th>Queue#</th> <th>Patient Name</th> <th>Age</th> <th>Address</th> <th>Phone</th> <th>Doctors</th> <th>Status</th> <th>Arrival Time</th> <th>Action</th> </tr> </thead> <tbody>
{patients.map((patient) => {
const patientQueue = queue.find(q => q.patient_id === patient.id);
const arrivalTime = patientQueue ? patientQueue.arrival_time : '—';
const isAssigned = !!patient.assignedDoctor;
        return (
          <tr key={patient.id}>
            <td>{patient.cardNo || '—'}</td>
            <td>{patient.queueNo || '—'}</td>
            <td>{patient.name}</td>
            <td>{patient.age || 'N/A'}</td>
            <td>{patient.address || 'N/A'}</td>
            <td>{patient.phone || 'N/A'}</td>
            <td>{patient.assignedDoctor || 'Unassigned'}</td>
            <td>
              <span
                className={`status-badge ${
                  patient.status?.toLowerCase().replace(/\s+/g, '-') || ''
                }`}
              >
                {patient.status || ''}
              </span>
            </td>
            <td>{arrivalTime}</td>
            <td>
              <button
                className={`assign-btn ${isAssigned ? 'update' : 'assign'}`}
                onClick={() => handleAssignDoctor(patient.id)}
              >
                {isAssigned ? 'Update' : 'Assign'}
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>

  {assigningPatient && (
    <div className="assignment-modal">
      <div className="modal-content">
        <div className="modal-header">
          <h4>Assign Doctor</h4>
          <button onClick={() => setAssigningPatient(null)}>×</button>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label>Select Doctor:</label>
            <select
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
              className="doctor-select"
            >
              <option value="">Select a doctor</option>
              {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.name}>
                  Dr. {doctor.name} ({doctor.speciality})
                </option>
              ))}
            </select>
          </div>
          <div className="modal-actions">
            <button
              className="confirm-btn"
              onClick={confirmAssignment}
              disabled={!selectedDoctor}
            >
              Confirm Assignment
            </button>
            <button
              className="cancel-btn"
              onClick={() => setAssigningPatient(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )}
</div>
);
};

export default PatientTable;
