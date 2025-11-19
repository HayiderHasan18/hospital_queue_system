import { useState, useRef} from 'react';
import { FiLogOut, FiUser, FiUpload } from 'react-icons/fi';
import './header.css';

const Header = ({ user, onLogout, onProfileUpdate }) => {
  const [isHovered, setIsHovered] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && user) {
      const formData = new FormData();
      formData.append('profile', file);
      formData.append('userId', user.id);
      onProfileUpdate(formData);
      e.target.value = null;
    }
  };

  const currentRole = user?.role || 'User';

  return (
    <header className="admin-header">
      <div className="user-profile-container">
        <div
          className="profile-photo-wrapper"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => fileInputRef.current.click()}
        >
          {user?.profile_picture ? (
            <img src={user.profile_picture} alt="Profile" className="profile-photo" />
          ) : (
            <div className="profile-photo">
              <FiUser className="profile-icon" />
            </div>
          )}
          {isHovered && (
            <div className="upload-overlay">
              <FiUpload className="upload-icon" />
            </div>
          )}
        </div>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          accept="image/*"
          onChange={handleImageUpload}
        />
        <div className="user-info">
          <div className="user-name">
            {user ? `${user.first_name} ${user.last_name}` : 'Loading...'}
          </div>
          <div className="user-role">{currentRole}</div>
        </div>
      </div>

      <div className="header-content">
        <div className="header-title">
          <h1>Welcome To Your Dashboard</h1>
          <p>Enjoy Our Hospital Queue Management System</p>
        </div>

        <div className="header-right">
          <button className="header-btn" onClick={onLogout}>
            <FiLogOut className="header-icon" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
