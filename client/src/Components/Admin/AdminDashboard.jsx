import React, { useState, useEffect } from 'react';
import Analytics from './Analytics';
import DoctorTable from './DoctorTable';
import PatientTable from './patientTable';
import StatsCards from './StatsCards';
import NavigationTabs from './NavigationTabs';
import Header from '../Doctor/Header';
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';

// Backend URL from environment variable
const BACKEND_URL = import.meta.env.VITE_API_URL;

// Initialize socket.io client with backend URL
const socket = io(BACKEND_URL);

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('patients');
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [queue, setQueue] = useState([]);
  const [analyticsData, setAnalyticsData] = useState({});
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    const stored = sessionStorage.getItem('admin_user');
    return stored ? JSON.parse(stored) : null;
  });

  const handleLogout = () => {
    sessionStorage.removeItem('admin_user');
    sessionStorage.removeItem('token');
    navigate('/');
  };

  const handleProfileUpdate = async (formData) => {
    try {
      const res = await fetch(`${BACKEND_URL}/user/profile`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
      });
      const data = await res.json();

      if (data.url) {
        const updatedUser = {
          ...user,
          profile_picture: `${data.url}?t=${Date.now()}`,
        };
        sessionStorage.setItem('admin_user', JSON.stringify(updatedUser));
        setUser(updatedUser);
      }
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };

  const fetchAllData = async () => {
    try {
      const [patientsRes, doctorsRes, queueRes, analyticsRes] = await Promise.all([
        fetch(`${BACKEND_URL}/admin/patients`, { headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` } }),
        fetch(`${BACKEND_URL}/admin/doctors`, { headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` } }),
        fetch(`${BACKEND_URL}/admin/queue`, { headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` } }),
        fetch(`${BACKEND_URL}/admin/analytics/summary`, { headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` } }),
      ]);

      setPatients(await patientsRes.json());
      setDoctors(await doctorsRes.json());
      setQueue(await queueRes.json());
      setAnalyticsData(await analyticsRes.json());
    } catch (err) {
      console.error('Error loading admin data:', err);
    }
  };

  useEffect(() => {
    fetchAllData();

    const update = () => fetchAllData();

    socket.on('queue_updated', update);
    socket.on('doctor_updated', update);
    socket.on('patient_updated', update);
    socket.on('doctor_info_updated', update);
    socket.on('admin_queue_updated', update);
    socket.on('patient_info_updated', update);

    return () => {
      socket.off('queue_updated', update);
      socket.off('doctor_updated', update);
      socket.off('patient_updated', update);
      socket.off('doctor_info_updated', update);
      socket.off('admin_queue_updated', update);
      socket.off('patient_info_updated', update);
    };
  }, []);

  return (
    <>
      <Header
        user={user}
        onLogout={handleLogout}
        onProfileUpdate={handleProfileUpdate}
      />

      <StatsCards analyticsData={analyticsData} />
      <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === 'patients' && (
        <PatientTable patients={patients} doctors={doctors} queue={queue} />
      )}
      {activeTab === 'doctors' && (
        <DoctorTable doctors={doctors} patients={patients} />
      )}
      {activeTab === 'analytics' && (
        <Analytics data={analyticsData} />
      )}
    </>
  );
}

export default AdminDashboard;
