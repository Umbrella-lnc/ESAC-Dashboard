const express = require('express');
const router = express.Router();

const {toggleVerifiedStatus, deleteUser} = require('../../controllers/usersManagementController.js');

// Account Management Routes
router.post("/toggleVerifiedStatus", toggleVerifiedStatus);
router.post("/deleteUser", deleteUser);

module.exports = router;