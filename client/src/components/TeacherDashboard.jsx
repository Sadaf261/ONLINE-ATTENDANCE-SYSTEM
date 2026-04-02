import React, { useEffect, useState } from 'react';
import { teacherAPI } from '../utils/api';
import './Dashboard.css';

const TeacherDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    teacherName: '',
    subject: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await teacherAPI.getDashboard();
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
      <h1>Teacher Dashboard</h1>
      <p>Welcome, {dashboardData.teacherName}!</p>
      <p>Subject: {dashboardData.subject}</p>
      <div className="teacher-actions">
        <a href="/mark-attendance" className="btn">Mark Attendance</a>
        <a href="/teacher-attendance-records" className="btn">View Records</a>
      </div>
    </div>
  );
};

export default TeacherDashboard;
