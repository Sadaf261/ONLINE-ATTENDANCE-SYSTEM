import axios from 'axios';

const API_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const authAPI = {
  adminLogin: (email, password) => api.post('/admin-login', { email, password }),
  teacherLogin: (email, password) => api.post('/teacher-login', { email, password }),
  studentLogin: (email, password) => api.post('/student-login', { email, password }),
  logout: () => api.post('/logout'),
};

export const adminAPI = {
  getDashboard: () => api.get('/admin-dashboard'),
  viewStudents: () => api.get('/admin/view-students'),
  viewTeachers: () => api.get('/admin/view-teachers'),
  addTeacher: (teacherData) => api.post('/admin/add-teacher', teacherData),
  searchAttendance: (name) => api.get('/search-attendance', { params: { name } }),
};

export const teacherAPI = {
  getDashboard: () => api.get('/teacher-dashboard'),
  markAttendance: (attendanceData) => api.post('/mark-attendance', attendanceData),
  getAttendanceRecords: () => api.get('/teacher-attendance-records'),
};

export const studentAPI = {
  getDashboard: () => api.get('/student-dashboard'),
  getAttendanceRecords: () => api.get('/students-attendance-record'),
};

export default api;
