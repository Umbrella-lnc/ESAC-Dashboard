const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const keys = require('../config/keys');
const validateRegiserInput = require('../validate/register');
const validateLoginInput = require('../validate/login');

// @route POST api/users/register
// @desc Register user
// @access Public
const register = async (req, res) => {
    // Form Validation
    const { errors, isValid } = validateRegiserInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email }).then(user => {

        // Make sure the user does not already exist
        if(user) {
            return res.status(400).json({ email: "Email already exists!"});
        }

        // Create the new user
        const newUser = new User({
            name: req.body.name,
            department: req.body.department,
            email: req.body.email,
            password: req.body.password,
            accessLevel: req.body.accessLevel
        });

        // Make sure to hash password for DB storage
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if(err) throw err;
                newUser.password = hash;
                newUser.save().then(user => res.json(user)).catch(err => console.log(err));
            });
        });
    });
}


// @route POST api/users/login
// @desc Login user, return JWT token.
// @access Public
const login = async (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    // Find by email
    User.findOne({ email: req.body.email }).then(user => {

        // Make sure user exists
        if(!user) {
            return res.status(404).json({ emailnotfound: "Email not found!"});
        }

        // Check if password is correct
        bcrypt.compare(password, user.password).then(isMatch => {
            if(isMatch) {
                const payload = {
                    id: user.id,
                    name: user.name
                };
                
                jwt.sign(payload, keys.secretOrKey, 
                        {expiresIn: 31556926},
                        (err, token) => {
                            res.json({
                                success: true,
                                token: "Bearer " + token
                            });
                        }
                );
            } else {
                return res.status(400).json({ passwordincorrect: "Password Incorrect!" });
            }
        });
    });
}

exports.register = register;
exports.login = login;