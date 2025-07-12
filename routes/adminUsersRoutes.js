const express = require('express');
const router = express.Router();
const db = require('../config/db');




// Middleware to check admin session
function adminAuth(req, res, next) {
    if (req.session && req.session.admin) {
        next();
    } else {
        res.redirect('/admin-login');
    }
}


// middleware to all routes below
router.use(adminAuth);


// View all students
router.get('/view-students', (req, res) => {
    const query = 'SELECT * FROM students';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching students:', err);
            return res.status(500).send('Server error');
        }
        res.render('adminViewStudents', { students: results });
    });
});

// View all teachers
router.get('/view-teachers', (req, res) => {
    const query = 'SELECT * FROM teachers';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching teachers:', err);
            return res.status(500).send('Server error');
        }
        res.render('adminViewTeachers', { teachers: results });
    });
});


// ------------------------
// GET route - Show Add Teacher Form
router.get('/add-teacher', async (req, res) => {
    res.render('add_teacher'); // Make sure 'add_teacher.ejs' is in your views folder
});

// ------------------------
// POST route - Add Teacher to DB
router.post('/add-teacher', async (req, res) => {
    const { name, email, password, subject, phone_number } = req.body;

    try {
        
        const insertQuery = `
            INSERT INTO teachers (name, email, password, subject, phone_number, created_at)
            VALUES (?, ?, ?, ?, ?, NOW())
        `;
        db.query(insertQuery, [name, email, password, subject, phone_number], (err, result) => {
            if (err) {
                console.error('Error inserting teacher:', err);
                return res.send('Error adding teacher');
            }
            res.redirect('/admin/view-teachers'); // Show updated list
        });

    } catch (err) {
        console.error('Error:', err);
        res.send('Internal Server Error');
    }
});

// ------------------------
module.exports = router;