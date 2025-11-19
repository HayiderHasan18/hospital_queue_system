import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './doctorInfo.css';
import { FaUser, FaStethoscope, FaPhone, FaHospitalAlt } from 'react-icons/fa';

// Use environment variable for backend URL
const BACKEND_URL = import.meta.env.VITE_API_URL;

const DoctorsInfo = () => {
  const [fullName, setFullName] = useState('');
  const [speciality, setSpeciality] = useState('');
  const [phone, setPhone] = useState('');
  const [room, setRoom] = useState('');
  const [isNewDoctor, setIsNewDoctor] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const user = JSON.parse(sessionStorage.getItem("doctor_user"));
        const name = user ? `${user.first_name} ${user.last_name}` : '';
        setFullName(name);

        const res = await axios.get(`${BACKEND_URL}/doctor-info/info`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
          }
        });

        const { speciality, phone, room } = res.data;
        setSpeciality(speciality || '');
        setPhone(phone || '');
        setRoom(room || '');
        setIsNewDoctor(!speciality && !phone && !room);
      } catch (err) {
        console.error('Failed to load doctor info:', err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorData();
  }, []);

  const isFormFilled = speciality.trim() !== '' && phone.trim() !== '' && room.trim() !== '';

  const handleSubmit = () => {
    axios.put(`${BACKEND_URL}/doctor-info/info`,
      { speciality, phone, room },
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`
        }
      }
    )
    .then(() => {
      alert('Information saved successfully!');
      setIsNewDoctor(false);
    })
    .catch(err => {
      console.error('Failed to save information:', err.response?.data || err.message);
      alert('Failed to save information.');
    });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="personal-info">
      <div className="section-header">
        <h2 className="section-title">Doctor Information</h2>
      </div>

      <div className="info-grid">
        <div className="info-item">
          <div className="info-label">
            <FaUser className="info-icon" />
            <span>Full Name</span>
          </div>
          <div className="info-value">{fullName}</div>
        </div>

        <div className="info-item">
          <div className="info-label">
            <FaStethoscope className="info-icon" />
            <span>Speciality</span>
          </div>
          <input
            type="text"
            placeholder="Insert speciality"
            value={speciality}
            onChange={e => setSpeciality(e.target.value)}
            className="info-input"
          />
        </div>

        <div className="info-item">
          <div className="info-label">
            <FaPhone className="info-icon" />
            <span>Phone Number</span>
          </div>
          <input
            type="text"
            placeholder="Insert phone"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            className="info-input"
          />
        </div>

        <div className="info-item">
          <div className="info-label">
            <FaHospitalAlt className="info-icon" />
            <span>Room</span>
          </div>
          <input
            type="text"
            placeholder="Insert room"
            value={room}
            onChange={e => setRoom(e.target.value)}
            className="info-input"
          />
        </div>
      </div>

      <button
        className="update-button"
        onClick={handleSubmit}
        disabled={!isFormFilled}
      >
        {isNewDoctor ? 'Save Info' : 'Update Info'}
      </button>
    </div>
  );
};

export default DoctorsInfo;
