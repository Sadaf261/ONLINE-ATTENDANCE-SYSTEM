const express = require('express');
const router = express.Router();      
const db = require('../config/db'); // Make sure you have this line

// Middleware to check if teacher is logged in
function teacherAuth(req, res, next) {
    if (req.session && req.session.teacher) {
        next();
    } else {
        res.redirect('/teacher-login');
    }
}

// Teacher dashboard route
router.get('/teacher-dashboard', teacherAuth, (req, res) => {
    const query = 'SELECT COUNT(*) AS totalStudents FROM students';

    db.query(query, (err, result) => {
        if (err) {
            console.error(err);
            if (req.accepts('json')) return res.status(500).json({ error: 'Database error' });
            return res.send('Database error');
        }

        const totalStudents = result[0].totalStudents;

        if (req.accepts('json')) {
            return res.json({
                teacherName: req.session.teacher.name,
                subject: req.session.teacher.subject || 'N/A',
                totalStudents: totalStudents
            });
        }

        res.render('teacherDashboard', {
            title: "Teacher Dashboard",
            teacher: req.session.teacher,
            totalStudents: totalStudents
        });
    });
});

// === GET: Mark Attendance Form ===
router.get('/teacher-dashboard/mark-attendance', teacherAuth, (req, res) => {
    const studentQuery = 'SELECT * FROM students';
    db.query(studentQuery, (err, students) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Database error');
        }

        res.render('markAttendance', {
            title: "Mark Attendance",
            teacher: req.session.teacher,
            students,
            error: null
        });
    });
});



/// Mark Attendance routes 

router.post('/mark-attendance', (req, res) => {
    console.log("Teacher session data:", req.session.teacher); 
    if (!req.session.teacher) {
        return res.redirect('/teacher-login');
    }

    const { student_id, date, status } = req.body;
    const markedAt = date ? new Date(date) : new Date();
    const teacherId = req.session.teacher.id;  // session se teacher ka id lo
    const today = markedAt.toISOString().split('T')[0];

    // Pehle students list le lo taaki agar error aaye to form sahi render ho
    const studentQuery = 'SELECT * FROM students';

    db.query(studentQuery, (err, students) => {
        if (err) {
            console.error('Error fetching students:', err);
            return res.status(500).send('Error loading students.');
        }

        // Check if attendance already marked
        const checkQuery = 'SELECT * FROM attendance WHERE student_id = ? AND DATE(marked_at) = ?';
        db.query(checkQuery, [student_id, today], (err, rows) => {
            if (err) {
                console.error('Error checking attendance:', err);
                return res.status(500).send('Error during checking.');
            }

            if (rows.length > 0) {
                // Agar attendance pehle se mark hai to form wapas bhejo error message ke sath
                return res.render('markAttendance', { students, title: 'Mark Attendance', error: 'Already marked attendance for today.' });
            }

            // Insert attendance with teacherId
            const insertQuery = 'INSERT INTO attendance (student_id, marked_at, status, marked_by_teacher_id) VALUES (?, ?, ?, ?)';
            db.query(insertQuery, [student_id, markedAt, status, teacherId], (err, result) => {
                if (err) {
                    console.error('Insert error:', err);
                    return res.status(500).send('Failed to mark attendance.');
                }

                res.redirect('teacher-attendance-records');
            });
        });
    });
});



// === GET: Teacher's Attendance Records ===
router.get('/teacher-attendance-records', teacherAuth, (req, res) => {
    const teacherId = req.session.teacher.id;

    const query = `
        SELECT attendance.*, students.name AS student_name 
        FROM attendance 
        JOIN students ON attendance.student_id = students.student_id 
        WHERE marked_by_teacher_id = ? 
        ORDER BY marked_at DESC
    `;

    db.query(query, [teacherId], (err, records) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Database error");
        }

        res.render('teacherAttendanceRecords', {
            title: "Your Attendance Records",
            records
        });
    });
});


module.exports = router;