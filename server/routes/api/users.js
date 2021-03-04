const userRoutes = require('../../controllers/users.js');
const express = require('express');

const router = express.Router();

router.post('/register', userRoutes.register);
router.post('/login', userRoutes.login);

module.exports = router;