const express = require('express');
const router = express.Router();

router.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                console.error('Logout error:', err);
                return res.status(500).send('Logout failed.');
            }

            res.clearCookie('connect.sid', {
                path: '/'
            });
           return res.redirect('/');
        });
    } else {
       return res.redirect('/');
    }
});


module.exports = router;