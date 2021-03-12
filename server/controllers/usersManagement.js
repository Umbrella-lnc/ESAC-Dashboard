const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const validateRegiserInput = require('../validate/register');
const validateLoginInput = require('../validate/login');
const dotenv = require('dotenv');

dotenv.config();
const secretOrKey = process.env.secretOrKey;


// @route POST api/usersManagement/toggleVerifiedStatus
// @desc Register a user in the database
// @access Admin
const toggleVerifiedStatus = async (req, res) => {
    // Make sure the user actually exists in the database
    User.findOne({ email: req.body.email }).then((user) => {
        if (!user) {
            return res.status(400).json({ doesnotexist: "User does not exist!" });
        }
    });

    // Make sure current user /JWT is an admin here.

    // Finish here
};

// @route POST api/usersManagement/deleteUser
// @desc Delete a user from the database
// @access Admin
const deleteUser = async (req, res) => {
    // Make sure the user actually exists in the database
    User.findOne({ email: req.body.email }).then((user) => {
        if (!user) {
            return res.status(400).json({ doesnotexist: "User does not exist!" });
        }
    });

    // Make sure the current user / JWT is an admin. TBD how to do this.

    User.findByIdAndDelete(req.query.uid);
};



exports.toggleVerifiedStatus = toggleVerifiedStatus;
exports.deleteUser = deleteUser;