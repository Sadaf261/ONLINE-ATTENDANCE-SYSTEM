import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Online Attendance System</h1>
        <p>QR Code Based Attendance Tracking</p>
      </div>
      
      <div className="login-options">
        <button onClick={() => navigate('/admin-login')} className="login-btn admin">
          🔐 Admin Login
        </button>
        <button onClick={() => navigate('/teacher-login')} className="login-btn teacher">
          👩‍🏫 Teacher Login
        </button>
        <button onClick={() => navigate('/student-login')} className="login-btn student">
          👨‍🎓 Student Login
        </button>
      </div>
    </div>
  );
};

export default Home;
