import React, { useEffect, useState } from 'react';
import { adminAPI } from '../utils/api';
import './Dashboard.css';

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    adminName: '',
    totalStudents: 0,
    totalTeachers: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await adminAPI.getDashboard();
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
      <h1>Admin Dashboard</h1>
      <p>Welcome, {dashboardData.adminName}!</p>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Students</h3>
          <p className="stat-number">{dashboardData.totalStudents}</p>
        </div>
        <div className="stat-card">
          <h3>Total Teachers</h3>
          <p className="stat-number">{dashboardData.totalTeachers}</p>
        </div>
      </div>
      <div className="admin-actions">
        <a href="/admin/view-students" className="btn">View Students</a>
        <a href="/admin/view-teachers" className="btn">View Teachers</a>
        <a href="/admin/add-teacher" className="btn">Add Teacher</a>
        <a href="/search-attendance" className="btn">Search Attendance</a>
      </div>
    </div>
  );
};

export default AdminDashboard;
