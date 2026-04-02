const express = require('express');
const router = express.Router();
const db = require('../config/db');


router.get('/', (req, res) => {
    return res.render('index', { title: "Home" });
 });
  
//========== Admin Login ==========//
router.get('/admin-login', (req, res) => {
    return res.render('adminLogin', { title: "Admin Login" });
});

router.post('/admin-login', (req, res) => {
    const { email, password } = req.body;
    db.query('SELECT * FROM admin WHERE email = ?', [email], async (err, results) => {
        if (err) {
            if (req.accepts('json')) return res.status(500).json({ error: "Error occurred" });
            return res.send("Error occurred");
        }
        if (results.length > 0) {
            if (password === results[0].password) {
                req.session.admin = {
                    id: results[0].id,
                    name: results[0].name,
                    email: results[0].email
                };
                req.session.save(()=>{
                    if (req.accepts('json')) {
                        return res.json({ message: "Login successful", redirect: '/admin-dashboard' });
                    }
                    res.redirect('/admin-dashboard');
                });
            } else {
                if (req.accepts('json')) return res.status(401).json({ error: "Invalid Admin Credentials." });
                return res.send("Invalid Admin Credentials.");
            }
        } else {
            if (req.accepts('json')) return res.status(401).json({ error: "Admin not found" });
            return res.send("Admin not found");
        }
    });
});

//========== Teacher Login ==========//
router.get('/teacher-login', (req, res) => {
    return res.render('teacherLogin', { title: "Teacher Login" });
});

router.post('/teacher-login', (req, res) => {
    const { email, password } = req.body;
    db.query('SELECT * FROM teacher WHERE email = ?', [email], async (err, results) => {
        if (err) {
            if (req.accepts('json')) return res.status(500).json({ error: "Error occurred" });
            return res.send("Error occurred");
        }
        if (results.length > 0) {
            if (password === results[0].password) {
                req.session.teacher = {
                    id: results[0].teacher_id,
                    name: results[0].name,
                    email: results[0].email
                };
                req.session.save(()=>{
                    if (req.accepts('json')) {
                        return res.json({ message: "Login successful", redirect: '/teacher-dashboard' });
                    }
                    res.redirect('/teacher-dashboard');
                });
            } else {
                if (req.accepts('json')) return res.status(401).json({ error: "Invalid Teacher Credentials." });
                return res.send("Invalid Teacher Credentials.");
            }
        } else {
            if (req.accepts('json')) return res.status(401).json({ error: "Teacher not found" });
            return res.send("Teacher not found");
        }
    });
});





//========== Student Login ==========//
router.get('/student-login', (req, res) => {
    return res.render('studentLogin', { title: "Student Login" });
});

router.post('/student-login', (req, res) => {
    const { email, password } = req.body;
    db.query('SELECT * FROM student WHERE email = ?', [email], async (err, results) => {
        if (err) {
            if (req.accepts('json')) return res.status(500).json({ error: "Error occurred" });
            return res.send("Error occurred");
        }
        if (results.length > 0) {
            if (password === results[0].password) {
                req.session.student = {
                    id: results[0].student_id,
                    name: results[0].name,
                    email: results[0].email
                };
                req.session.save(()=>{
                    if (req.accepts('json')) {
                        return res.json({ message: "Login successful", redirect: '/student-dashboard' });
                    }
                    res.redirect('/student-dashboard');
                });
            } else {
                if (req.accepts('json')) return res.status(401).json({ error: "Invalid Student Credentials." });
                return res.send("Invalid Student Credentials.");
            }
        } else {
            if (req.accepts('json')) return res.status(401).json({ error: "Student not found" });
            return res.send("Student not found");
        }
    });
});



//========== Student Registration ==========//

router.get('/student-register', (req, res) => {
    if (!req.session.admin) return res.redirect('/admin-login');
    return res.render('studentRegister', { title: "Student Registration" });
});

router.post('/student-register', async (req, res) => {
    if (!req.session.admin) return res.redirect('/admin-login');

    const { name, email, password, roll_number, course } = req.body;

    if (!name || !email || !password || !roll_number || !course) {
        return res.send("Please fill in all the fields.");
    }

    db.query('SELECT * FROM students WHERE email = ?', [email], async (err, results) => {
        if (err) {
            console.error("Database Error:", err);
            return res.send("Database Error. Please try again.");
        }

        if (results.length > 0) {
            return res.send("Student already registered with this email.");
        }

        

            const sql = 'INSERT INTO students (name, email, password, roll_number, course) VALUES (?, ?, ?, ?, ?)';
            db.query(sql, [name, email, password, roll_number, course], (err, result) => {
                if (err) {
                    console.error("Error during registration:", err);
                    return res.send("Error during registration. Please try again.");
                }
                return res.redirect('/student-login');
            });  
    });
});
module.exports = router;

