import React, { useEffect, useState } from 'react';
import Header from '../Doctor/Header';
import PublicScreen from '../PublicScreen/PublicScree';
import QueueStatus from './QueueStatus';
import PersonalInfo from './PersonalInfo';
import DoctorAssignment from './DoctorAssignment';
import './dashboard.css';
import axios from 'axios';
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';

const socket = io('http://localhost:5000');

const PatientDashboard = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    const stored = sessionStorage.getItem('patient_user');
    return stored ? JSON.parse(stored) : null;
  });
const userId = user?.id;
  const [queueData, setQueueData] = useState(null);
  const [doctorData, setDoctorData] = useState(null);

  const handleLogout = () => {
    sessionStorage.removeItem('patient_user');
    navigate('/');
  };

  const handleProfileUpdate = async (formData) => {
    try {
      const res = await fetch('http://localhost:5000/api/user/profile', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();

      if (data.url) {
        const updatedUser = { ...user, profile_picture: data.url };
        sessionStorage.setItem('patient_user', JSON.stringify(updatedUser));
        setUser(updatedUser);
      }
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };

  const fetchDashboard = async () => {
    if (!userId) return;
    try {
      const res = await axios.get(
        `http://localhost:5000/api/patients/dashboard?userId=${userId}`
      );
      setQueueData(res.data.queueStatus);
      setDoctorData(res.data.doctorAssignment);
    } catch (err) {
      console.error('Failed to load dashboard:', err);
    }
  };

  useEffect(() => {
    if (!userId) return;

    fetchDashboard();

    const onQueueUpdated = (data) => {
      if (!data || data.userId === userId) {
        fetchDashboard();
      }
    };

    const onQueueCalled = () => {
      fetchDashboard();
    };

    const onConsultationStarted = () => {
      fetchDashboard();
    };

    socket.on('queue_updated', onQueueUpdated);
    socket.on('queue_called', onQueueCalled);
    socket.on('consultation_started', onConsultationStarted);

    return () => {
      socket.off('queue_updated', onQueueUpdated);
      socket.off('queue_called', onQueueCalled);
      socket.off('consultation_started', onConsultationStarted);
    };
  }, [userId]);

  return (
    <>
      <Header
        user={user}
        onLogout={handleLogout}
        onProfileUpdate={handleProfileUpdate}
      />

      <div className="patient-dashboard">
        <div className="dashboard-content">
          <div className="left-section">
            <QueueStatus data={queueData} />
            <DoctorAssignment data={doctorData} />
          </div>
          <div className="right-section">
            <PersonalInfo />
          </div>
        </div>
      </div>

      <PublicScreen />
    </>
  );
};

export default PatientDashboard;
