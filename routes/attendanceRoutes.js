const express = require('express');
const db = require('../config/db'); // Import db connection
const router = express.Router();

// Middleware to check if admin is logged in
function attendanceSearchAuth(req, res, next) {
    if (req.session && req.session.admin) {
       return next();
    } else {
       return res.redirect('/admin-login'); // Redirect to login if not logged in
    }
}



// Route for searching attendance by student name (admin only)
router.get('/search-attendance', attendanceSearchAuth, (req, res) => {
    const name = req.query.name;
    if (!name) {
        return res.render('search', { attendanceRecords: [] }); // Show empty or initial state
    }

    const query = `
        SELECT a.attendance_id, a.student_id, a.date, a.status, a.marked_at, s.name AS student_name
        FROM attendance a
        JOIN students s ON a.student_id = s.student_id
        WHERE s.name LIKE ?
    `;
    
    db.query(query, [`%${name}%`], (err, results) => {
        if (err) {
            console.error('Database error while searching attendance:',err);
            return res.status(500).send('Internal server Error');
        }
       return res.render('search', { attendanceRecords: results });
    });
});

module.exports = router;