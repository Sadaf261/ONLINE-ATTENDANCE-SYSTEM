# Online Attendance System - Full Stack

A modern **Node.js + React.js** based attendance management system with **QR Code** support for **Admin**, **Teacher**, and **Student** roles.

## 📋 Project Structure

```
online-attendance-system/
├── server.js                      # Node.js Express server
├── package.json                   # Backend dependencies
├── .env                          # Environment variables
├── config/
│   └── db.js                     # MySQL database configuration
├── routes/
│   ├── mainRoutes.js             # Admin/Teacher/Student login
│   ├── adminDashboardRoutes.js   # Admin dashboard API
│   ├── teacherDashboardRoutes.js # Teacher dashboard API
│   ├── studentDashboardRoutes.js # Student dashboard API
│   ├── attendanceRoutes.js       # Attendance marking
│   ├── adminUsersRoutes.js       # Admin user management
│   └── ... (other routes)
├── views/                        # EJS templates (legacy)
├── public/                       # Static files (CSS, JS, images)
└── client/                       # React.js frontend
    ├── package.json              # Frontend dependencies
    ├── public/
    │   └── index.html
    └── src/
        ├── App.jsx               # Main app component
        ├── index.jsx             # React entry point
        ├── components/
        │   ├── AdminLogin.jsx
        │   ├── AdminDashboard.jsx
        │   ├── TeacherLogin.jsx
        │   ├── TeacherDashboard.jsx
        │   ├── StudentLogin.jsx
        │   ├── StudentDashboard.jsx
        │   └── *.css             # Component styles
        ├── pages/
        │   └── Home.jsx          # Home page
        └── utils/
            └── api.js            # API service layer
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v14 or higher)
- **MySQL** (v5.7 or higher)
- **npm** or **yarn**

### 1. Database Setup

Start your MySQL server, then run:

```bash
mysql -u root -p < database_setup.sql
```

Or manually execute the SQL in `database_setup.sql` file.

### 2. Backend Setup

```bash
# Install dependencies
npm install

# Configure environment variables (.env)
DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_NAME=college_attendance
PORT=3000
SESSION_SECRET=super_secret_session_key_12345

# Start server
npm start
```

The backend will run on `http://localhost:3000`

### 3. Frontend Setup

```bash
cd client

# Install React dependencies
npm install

# Start React development server
npm start
```

The frontend will run on `http://localhost:3000` and the React app will open automatically.

## 🔐 User Credentials

### Sample Login Credentials

**Admin:**
- Email: `admin@college.com`
- Password: `admin123`

**Teacher:**
- Email: `john@college.com`
- Password: `teacher123`

**Student:**
- Email: `alice@college.com`
- Password: `student123`

OR

- Email: `bob@college.com`
- Password: `student123`

## ✨ Features

### 🔑 Admin Dashboard
- View total students and teachers
- Manage student and teacher profiles
- Add new teachers
- Search attendance records
- System administration

### 👩‍🏫 Teacher Dashboard
- Mark attendance with QR codes
- View attendance records
- Manage classes and students
- Generate attendance reports

### 👨‍🎓 Student Dashboard
- View personal attendance records
- Track attendance percentage
- Download attendance reports

## 🔄 API Architecture

The backend supports **both** EJS (traditional) and **JSON API** responses:

### Admin Login
```
POST /admin-login
Content-Type: application/json

{
  "email": "admin@college.com",
  "password": "admin123"
}

Response:
{
  "message": "Login successful",
  "redirect": "/admin-dashboard"
}
```

### Get Admin Dashboard Data
```
GET /admin-dashboard
Accept: application/json

Response:
{
  "adminName": "Admin User",
  "totalStudents": 10,
  "totalTeachers": 5
}
```

### Student Dashboard
```
GET /student-dashboard
Accept: application/json

Response:
{
  "studentName": "Alice Smith",
  "rollNumber": "CS001",
  "totalAttendance": 25
}
```

## 🛠️ Technologies Used

### Backend
- **Express.js** - Web framework
- **MySQL2** - Database driver
- **bcrypt** - Password hashing
- **JWT** - Authentication tokens
- **dotenv** - Environment management
- **EJS** - Template engine (legacy)
- **qrcode** - QR code generation
- **jsqr** - QR code reading

### Frontend
- **React** - UI library
- **React Router** - Navigation
- **Axios** - HTTP client
- **CSS3** - Styling

## 📝 Database Schema

### Tables
- **admin** - Admin accounts
- **teacher/teachers** - Teacher accounts
- **student/students** - Student accounts
- **attendance** - Attendance records

## 🔧 Development

### Modifying Backend Routes

All routes now support both EJS and JSON responses. Use `req.accepts('json')` to check for JSON requests:

```javascript
router.get('/route', (req, res) => {
  if (req.accepts('json')) {
    res.json({ /* JSON response */ });
  } else {
    res.render('view', { /* EJS data */ });
  }
});
```

### Modifying React Components

Update components in `/client/src/components/` and import the API service from `/client/src/utils/api.js`

## 🐛 Troubleshooting

### Database Connection Failed
- Ensure MySQL server is running
- Check `.env` file for correct credentials
- Verify database `college_attendance` exists

### React App Won't Start
```bash
cd client
rm -rf node_modules package-lock.json
npm install
npm start
```

### Port Already in Use
- Backend: Change `PORT` in `.env`
- Frontend: Use `PORT=3001 npm start`

## 📦 Build for Production

### Backend
```bash
# Already production-ready, just ensure .env is configured
npm start
```

### Frontend
```bash
cd client
npm run build

# Output will be in client/build/
```

## 👥 Collaboration

To work on this project with your team:

1. Clone the repository
2. Follow the setup instructions above
3. Create feature branches for new features
4. Make pull requests for code review

## 📄 License

ISC License

## 🔗 Important Links & Commands

```bash
# View database
mysql -u root college_attendance

# Reset database
mysql -u root -p < database_setup.sql

# Backend logs
npm start (shows all console logs)

# Frontend debugging
Chrome DevTools (F12)
```

---

**Happy Coding! 🎉**

For issues or questions, please create an issue in the repository.
