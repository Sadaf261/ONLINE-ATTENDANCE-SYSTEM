const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/view-attendance-records', (req, res) => {


// Ensure only authenticated admins can access attendance records
if (!req.session.admin) {
    return res.redirect('/admin-login');
}

    const query = `
        SELECT a.attendance_id, s.name, s.roll_number, a.student_id, a.marked_at 
        FROM attendance a
        JOIN students s ON a.student_id = s.student_id
        ORDER BY a.marked_at DESC
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching attendance records:', err);
            return res.status(500).send('Failed to retrieve attendance records.');
        }
        res.render('attendanceRecords', { records: results });
    });
});

module.exports = router;