const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const db = require('./config/db');
const session = require('express-session');




dotenv.config();

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

  

//Routes import
const mainRoutes = require('./routes/mainRoutes');
const adminDashboardRoutes = require('./routes/adminDashboardRoutes');
const teacherDashboardRoutes = require('./routes/teacherDashboardRoutes');
const studentDashboardRoutes = require('./routes/studentDashboardRoutes');
const viewAttendanceRoutes = require('./routes/viewAttendanceRoutes');
const filterAttendanceRoutes = require('./routes/filterAttendanceRoutes');
const adminUsersRoutes = require('./routes/adminUsersRoutes');
const logoutRoutes = require('./routes/logoutRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');





//Middleware setup
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: 'bcaFinal@attendanceQR',
  resave: false,
  saveUninitialized: false,
  cookie:{secure:false}
}));



//Routes for Dashboard
app.use('/',mainRoutes);  // <-- main routes
app.use('/', adminDashboardRoutes);
app.use('/', teacherDashboardRoutes);
app.use('/', studentDashboardRoutes);
app.use('/',viewAttendanceRoutes);  // <-- view for attendance
app.use('/',filterAttendanceRoutes); // <-- filtering for date and attendance
app.use('/admin',adminUsersRoutes); // <-- admin view for students and tearcher and adding teacher registeration
app.use('/',logoutRoutes);  // <-- logout button use
app.use('/',attendanceRoutes); // <-- attendance 



// Server listen
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});