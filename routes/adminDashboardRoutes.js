const express = require('express');
const router = express.Router();
const db = require('../config/db'); // "Don't forget to import the database configuration."

// Middleware to check admin session
function adminAuth(req, res, next) {
    if (req.session && req.session.admin) {
        next();
    } else {
        res.redirect('/admin-login');
    }
}

router.get('/admin-dashboard', adminAuth, (req, res) => {
    const getStudentCount = 'SELECT COUNT(*) AS totalStudents FROM students';
    const getTeacherCount = 'SELECT COUNT(*) AS totalTeachers FROM teacher';

    db.query(getStudentCount, (err, studentResult) => {
        if (err) return res.status(500).json({ error: 'Error fetching student count' });

        db.query(getTeacherCount, (err2, teacherResult) => {
            if (err2) return res.status(500).json({ error: 'Error fetching teacher count' });

            // Return JSON for API requests
            if (req.accepts('json')) {
                return res.json({
                    adminName: req.session.admin.name,
                    totalStudents: studentResult[0].totalStudents,
                    totalTeachers: teacherResult[0].totalTeachers
                });
            }
            
            // Render EJS for browser requests
            res.render('adminDashboard', {
                title: "Admin Dashboard",
                adminName: req.session.admin.name,
                totalStudents: studentResult[0].totalStudents,
                totalTeachers: teacherResult[0].totalTeachers
            });
        });
    });
});

module.exports = router;