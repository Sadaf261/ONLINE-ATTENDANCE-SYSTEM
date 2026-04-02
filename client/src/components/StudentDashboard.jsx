import React, { useEffect, useState } from 'react';
import { studentAPI } from '../utils/api';
import './Dashboard.css';

const StudentDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    studentName: '',
    rollNumber: '',
    totalAttendance: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await studentAPI.getDashboard();
      setDashboardData(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load dashboard');
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="dashboard-container">
      <h1>Student Dashboard</h1>
      <p>Welcome, {dashboardData.studentName}!</p>
      <p>Roll Number: {dashboardData.rollNumber}</p>
      <div className="stat-card">
        <h3>Total Attendance Records</h3>
        <p className="stat-number">{dashboardData.totalAttendance}</p>
      </div>
      <div className="student-actions">
        <a href="/students-attendance-record" className="btn">View My Attendance</a>
      </div>
    </div>
  );
};

export default StudentDashboard;
