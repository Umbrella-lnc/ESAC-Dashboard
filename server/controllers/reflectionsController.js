const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const validateRegiserInput = require('../validate/register');
const validateLoginInput = require('../validate/login');
const dotenv = require('dotenv');

dotenv.config();
const secretOrKey = process.env.secretOrKey;

// @route POST api/reflections/createReflectionForm
// @desc 
// @access 
const createReflectionForm = async (req, res) => {

};


// @route POST api/reflections/respondToReflectionForm
// @desc 
// @access 
const respondToReflectionForm = async (req, res) => {

};


// @route GET api/reflections/getReflectionForms
// @desc 
// @access 
const getReflectionForms = async (req, res) => {

};

exports.createReflectionForm = createReflectionForm;
exports.respondToReflectionForm = respondToReflectionForm;
exports.getReflectionForms = getReflectionForms;