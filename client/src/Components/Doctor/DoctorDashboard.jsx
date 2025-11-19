import React, { useState, useEffect } from 'react';
import Header from './Header';
import Stats from './Stats';
import PatientQueue from './PatientQueue';
import CurrentPatient from './CurrentPatient';
import ServedToday from './ServedToday';
import DoctorsInfo from './DoctorsInfo';
import './DoctorDash.css';
import socket from '../../socket';
import { useNavigate } from 'react-router-dom';

// Use environment variable for backend URL
const BACKEND_URL = import.meta.env.VITE_API_URL;

const DoctorDashboard = () => {
  const [doctorUserId, setDoctorUserId] = useState(null);
  const [patients, setPatients] = useState([]);
  const [currentPatient, setCurrentPatient] = useState(null);
  const [servedPatients, setServedPatients] = useState([]);
  const [isActionInProgress, setIsActionInProgress] = useState(false);
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    const stored = sessionStorage.getItem('doctor_user');
    return stored ? JSON.parse(stored) : null;
  });

  const handleLogout = () => {
    sessionStorage.removeItem('doctor_user');
    sessionStorage.removeItem('token');
    navigate('/');
  };

  const handleProfileUpdate = async (formData) => {
    try {
      const res = await fetch(`${BACKEND_URL}/user/profile`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();

      if (data.url) {
        const updatedUser = {
          ...user,
          profile_picture: data.url,
        };
        sessionStorage.setItem('doctor_user', JSON.stringify(updatedUser));
        setUser(updatedUser);
      }
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };

  useEffect(() => {
    const storedDoctor = JSON.parse(sessionStorage.getItem('doctor_user'));
    if (storedDoctor?.id) {
      setDoctorUserId(storedDoctor.id);
      fetchDoctorData(storedDoctor.id);
    } else {
      alert('Doctor not found. Please log in again.');
    }
  }, []);

  useEffect(() => {
    if (!doctorUserId) return;

    const handleQueueUpdate = () => {
      fetchDoctorData(doctorUserId);
    };

    socket.on('queue_updated', handleQueueUpdate);
    return () => socket.off('queue_updated', handleQueueUpdate);
  }, [doctorUserId]);

  const fetchDoctorData = async (userId) => {
    try {
      const res = await fetch(`${BACKEND_URL}/doctor/patients?doctorId=${userId}`);
      const data = await res.json();

      setPatients(data.queuePatients || []);
      setServedPatients(data.servedPatients || []);
      const current = data.queuePatients.find(p => p.status === 'in_progress');
      setCurrentPatient(current || null);
    } catch (err) {
      console.error('Fetch doctor data error:', err);
    }
  };

  const updatePatientStatus = (patientId, newStatus) => {
    setPatients(prev =>
      prev.map(p => (p.id === patientId ? { ...p, status: newStatus } : p))
    );
  };

  const handleCallPatient = async (patient) => {
    if (isActionInProgress) return;
    setIsActionInProgress(true);
    const originalStatus = patient.status;

    try {
      updatePatientStatus(patient.id, 'called');

      const res = await fetch(`${BACKEND_URL}/doctor/call-patient`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ patientId: patient.id, doctorId: doctorUserId }),
      });

      if (!res.ok) throw new Error('Failed to call patient');

      socket.emit('queue_called', {
        queueNo: patient.queue_no,
        doctor: `${user?.first_name} ${user?.last_name}`,
        room: user?.room || 'Unknown',
      });

      socket.emit('queue_updated');
    } catch (err) {
      console.error('Call patient error:', err);
      updatePatientStatus(patient.id, originalStatus);
    } finally {
      setIsActionInProgress(false);
    }
  };

  const handleStartConsultation = async (patient) => {
    if (isActionInProgress) return;
    setIsActionInProgress(true);
    const originalStatus = patient.status;

    try {
      updatePatientStatus(patient.id, 'in_progress');
      setCurrentPatient({ ...patient, status: 'in_progress' });

      const res = await fetch(`${BACKEND_URL}/doctor/start-consultation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ patientId: patient.id, doctorId: doctorUserId }),
      });

      if (!res.ok) throw new Error('Failed to start consultation');

      socket.emit('consultation_started', {
        queueNo: patient.queue_no,
      });

      socket.emit('queue_updated');
    } catch (err) {
      console.error('Start consultation error:', err);
      updatePatientStatus(patient.id, originalStatus);
      setCurrentPatient(null);
    } finally {
      setIsActionInProgress(false);
    }
  };

  const handleMarkServed = async () => {
    if (!currentPatient || isActionInProgress) return;
    setIsActionInProgress(true);
    const patientId = currentPatient.id;

    try {
      setPatients(prev => prev.filter(p => p.id !== patientId));
      setServedPatients(prev => [...prev, { ...currentPatient, status: 'served' }]);
      setCurrentPatient(null);

      const res = await fetch(`${BACKEND_URL}/doctor/mark-served`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ patientId, doctorId: doctorUserId }),
      });

      if (!res.ok) throw new Error('Failed to mark as served');

      socket.emit('queue_updated');
    } catch (err) {
      console.error('Mark served error:', err);
      fetchDoctorData(doctorUserId);
    } finally {
      setIsActionInProgress(false);
    }
  };

  return (
    <>
      <Header
        user={user}
        onLogout={handleLogout}
        onProfileUpdate={handleProfileUpdate}
      />
      <Stats
        queueCount={patients.filter(p => p.status === 'waiting').length}
        calledCount={patients.filter(p => p.status === 'called').length}
        servedCount={servedPatients.length}
      />
      <div className="dashboard-layout">
        <div className="left-container">
          <PatientQueue
            patients={patients}
            onCallPatient={handleCallPatient}
            onStartConsultation={handleStartConsultation}
            currentPatientId={currentPatient?.id}
            onMarkServed={handleMarkServed}
            isActionInProgress={isActionInProgress}
          />
          <ServedToday patients={servedPatients} />
        </div>
        <div className="right-container">
          <div className="top-right">
            <DoctorsInfo />
          </div>
          <div className="bottom-right">
            <CurrentPatient
              patient={currentPatient}
              onMarkServed={handleMarkServed}
              isActionInProgress={isActionInProgress}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorDashboard;
