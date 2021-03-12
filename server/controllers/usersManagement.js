const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UnverifiedUser = require('../models/UnverifiedUser');
const VerifiedUser = require('../models/VerifiedUser');
const validateRegiserInput = require('../validate/register');
const validateLoginInput = require('../validate/login');
const dotenv = require('dotenv');

dotenv.config();
const secretOrKey = process.env.secretOrKey;


// @route POST api/usersManagement/toggleVerifiedStatus
// @desc Register a user in the database
// @access Admin
const toggleVerifiedStatus = async (req, res) => {

}

// @route POST api/usersManagement/deleteUser
// @desc Delete a user from the database
// @access Admin
const deleteUser = async (req, res) => {

}



exports.toggleVerifiedStatus = toggleVerifiedStatus;
exports.deleteUser = deleteUser;