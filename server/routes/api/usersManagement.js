const express = require('express');
const router = express.Router();

const {toggleVerifiedStatus, deleteUser} = require('../../controllers/usersManagement.js');

// Account Management Routes
router.post("/toggleVerifiedStatus", toggleVerifiedStatus);
router.post("/deleteUser", deleteUser);

module.exports = router;