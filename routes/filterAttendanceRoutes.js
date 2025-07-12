const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Middleware to check admin session

function attendanceFilterAuth(req, res, next) {
    if (req.session && req.session.admin) {
       return next();
    } else {
       return res.redirect('/admin-login');
    }
}

     


// Apply middleware to all routes below 

router.use(attendanceFilterAuth);

//GET: Show filter form

router.get('/filter-attendance', (req, res) => {
   return res.render('filterAttendance'); //Ensure 'filterAttendance.ejs' is ready to take input and show results
});

// POST: Handle filtering 

router.post('/filter-attendance', (req, res) => {
    const { student_id, date } = req.body;

    let query = `
        SELECT attendance.id, students.name, students.roll_number, attendance.student_id, attendance.marked_at 
        FROM attendance 
        JOIN students ON attendance.student_id = students.student_id 
        WHERE 1 = 1
    `;

    const params = [];

    if (student_id) {
        query += ' AND attendance.student_id = ?';
        params.push(student_id);
    }

    if (date) {
        query += ' AND DATE(attendance.marked_at) = ?';
        params.push(date);
    }

    db.query(query, params, (err, results) => {
        if (err) {
            console.error('Error filtering attendance:', err);
            return res.status(500).send('Failed to filter attendance records.');
        }
      return  res.render('filterAttendance', { records: results,
            student_id,
            date
            
         });
    });
});

module.exports = router;