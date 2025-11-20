import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './personalInfo.css';
import { FaUser, FaBirthdayCake, FaPhone, FaHome } from 'react-icons/fa';

// Use environment variable for backend URL
const BACKEND_URL = import.meta.env.VITE_API_URL;

const PersonalInfo = () => {
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [isNewPatient, setIsNewPatient] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = JSON.parse(sessionStorage.getItem("patient_user"));
        const name = user ? `${user.first_name} ${user.last_name}` : '';
        setFullName(name);

        const res = await axios.get(`${BACKEND_URL}/patient/info`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
          }
        });

        const { fullName, age, phone, address } = res.data;
        setFullName(fullName || name);
        setAge(age || '');
        setPhone(phone || '');
        setAddress(address || '');
        setIsNewPatient(!age && !phone && !address);
      } catch (err) {
        console.error("Error fetching patient info:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const isFormFilled = age.toString().trim() !== '' && phone.trim() !== '' && address.trim() !== '';

  const handleSubmit = async () => {
    try {
      await axios.put(
        `${BACKEND_URL}/patient/info`,
        { age, phone, address },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
          }
        }
      );
      alert("Information saved!");
      setIsNewPatient(false);
    } catch (err) {
      console.error("Error saving info:", err.response?.data || err.message);
      alert("Error saving info");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="personal-info">
      <div className="section-header">
        <h2 className="section-title">Personal Information</h2>
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
            <FaBirthdayCake className="info-icon" />
            <span>Age</span>
          </div>
          <input
            type="number"
            placeholder="Insert age"
            value={age}
            onChange={e => setAge(e.target.value)}
            className="info-input"
          />
        </div>

        <div className="info-item">
          <div className="info-label">
            <FaPhone className="info-icon" />
            <span>Phone Number</span>
          </div>
          <input
            type="tel"
            placeholder="Insert phone"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            className="info-input"
          />
        </div>

        <div className="info-item">
          <div className="info-label">
            <FaHome className="info-icon" />
            <span>Address</span>
          </div>
          <input
            type="text"
            placeholder="Insert address"
            value={address}
            onChange={e => setAddress(e.target.value)}
            className="info-input"
          />
        </div>
      </div>

      <button
        className="update-button"
        onClick={handleSubmit}
        disabled={!isFormFilled}
      >
        {isNewPatient ? 'Save Info' : 'Update Info'}
      </button>
    </div>
  );
};

export default PersonalInfo;
