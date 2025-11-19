import React, { useEffect, useState } from 'react';
import './public.css';
import { FiBell, FiUser, FiMapPin, FiVolume2 } from 'react-icons/fi';
import socket from '../../socket';

// Use environment variable for backend
const BACKEND_URL = import.meta.env.VITE_API_URL;

const PublicScreen = () => {
  const [time, setTime] = useState(new Date());
  const [nowServingList, setNowServingList] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    fetchCurrentServing();

    const onQueueCalled = ({ queueNo, doctor, room }) => {
      updateServingList({ queueNo, doctor, room, status: 'called' });
      announce(queueNo, doctor, room, 'called');
    };

    const onConsultationStarted = ({ queueNo, doctor, room }) => {
      updateServingList({ queueNo, doctor, room, status: 'in_progress' });
      announce(queueNo, doctor, room, 'serving');
    };

    const onQueueUpdated = () => {
      fetchCurrentServing();
    };

    socket.on('queue_called', onQueueCalled);
    socket.on('consultation_started', onConsultationStarted);
    socket.on('queue_updated', onQueueUpdated);

    return () => {
      clearInterval(interval);
      socket.off('queue_called', onQueueCalled);
      socket.off('consultation_started', onConsultationStarted);
      socket.off('queue_updated', onQueueUpdated);
    };
  }, []);

  const fetchCurrentServing = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/public/current-serving`);
      if (res.ok) {
        const data = await res.json();
        setNowServingList(Array.isArray(data) ? data : data ? [data] : []);
      }
    } catch (error) {
      console.error('Fetch current serving failed:', error);
    }
  };

  const updateServingList = (newEntry) => {
    setNowServingList((prev) => {
      const filtered = prev.filter((p) => p.queueNo !== newEntry.queueNo);
      return [newEntry, ...filtered];
    });
  };

  const announce = (queueNo, doctor, room, type = 'called') => {
    const message =
      type === 'called'
        ? `Queue ${queueNo} is called. Please go to ${doctor}, room ${room}.`
        : `Now serving queue ${queueNo} with ${doctor} in room ${room}.`;

    const utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = 'en-US';
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  };

  const formatTime = (date) => date.toLocaleTimeString();

  return (
    <div className="public-container">
      <div className="public-header">
        <h2>Public Screen</h2>
        <div className="public-info">
          <span>🕒 {formatTime(time)}</span>
        </div>
      </div>

      <div className="queue-cards-container">
        {nowServingList.length === 0 && (
          <div className="now-serving-card empty-card">
            <FiBell className="bell-icon" />
            <h3>Please wait your turn</h3>
            <h1 className="queue-number">--</h1>
          </div>
        )}

        {nowServingList.map((item) => {
          const isBlinking = item.status === 'called';
          return (
            <div key={item.queueNo} className="now-serving-card">
              <div className="card-header">
                <FiBell className="bell-icon" />
                <span className="status-label">
                  {item.status === 'called' ? 'CALLED' : 'NOW SERVING'}
                </span>
              </div>
              <h1 className={`queue-number ${isBlinking ? 'blink' : ''}`}>
                {item.queueNo}
              </h1>
              <div className="doctor-room-box">
                <div className="doctor-room-item">
                  <FiUser />
                  <span>{item.doctor || '—'}</span>
                </div>
                <div className="doctor-room-item">
                  <FiMapPin />
                  <span>{item.room || '—'}</span>
                </div>
              </div>
              <button
                className="announcement-btn"
                onClick={() =>
                  announce(
                    item.queueNo,
                    item.doctor,
                    item.room,
                    item.status === 'in_progress' ? 'serving' : 'called'
                  )
                }
              >
                <FiVolume2 />
                Announce
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PublicScreen;
