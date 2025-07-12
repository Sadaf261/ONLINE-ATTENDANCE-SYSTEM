const express = require('express');
const router = express.Router();
const db = require('../config/db');  // MYSQL connection

// Middleware to check if student is logged in 
function studentAuth(req, res, next) {
    if (req.session && req.session.student) {
        return next();
    } else {
        return res.redirect('/student-login');
    }
}

// Student dashboard route
router.get('/student-dashboard', studentAuth, (req, res) => {
    const studentId = req.session.student.id;

    const query = 'SELECT COUNT(*) AS total FROM attendance WHERE student_id = ?';

    db.query(query, [studentId], (err, results) => {
        if (err) {
            console.error(err);
            return res.send('Database error');
        }

        const totalAttendance = results[0].total;

        res.render('studentDashboard', {
            title: "Student Dashboard",
            message: "Welcome to the Student Dashboard!",
            student: req.session.student,
            totalAttendance: totalAttendance
        });
    });
});


// View attendance route
router.get('/students-attendance-record', studentAuth, (req, res) => {
    const studentId = req.session.student.id;
     

    const query = 'SELECT date, status FROM attendance WHERE student_id = ? ORDER BY date DESC';

    db.query(query, [studentId], (err, results) => {
        if (err) {
            console.error(err);
            return res.send('Database error while fetching attendance.');
        }

        res.render('student-view-attendance', {
            title: 'Attendance Records',
            attendanceData: results
        });
    });
});

module.exports = router;
