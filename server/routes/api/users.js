const userRoutes = require('../../controllers/users.js');
const express = require('express');

const router = express.Router();

router.post('/register', userRoutes.register);
router.post('/login', userRoutes.login);
router.get('/', (req, res) => { // access by localhost:5000/api/users/
    res.send('It works!!!');
});

module.exports = router;