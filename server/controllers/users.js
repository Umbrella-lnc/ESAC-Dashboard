const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const validateRegiserInput = require("../validate/register");
const validateLoginInput = require("../validate/login");
const dotenv = require("dotenv");

dotenv.config();
const secretOrKey = process.env.secretOrKey;

// @route POST api/users/register
// @desc Register user
// @access Public
const register = async (req, res) => {
  // Form Validation
  const { errors, isValid } = validateRegiserInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Make sure user does not already exist as a verified user
  User.findOne({ $and: [{ email: req.body.email }, { active: true }] }).then(
    (user) => {
      // Make sure the user does not already exist as an unverified user
      if (user) {
        if (user.active == false) {
          return res
            .status(400)
            .json({ unverified: "Account is awaiting approval!" });
        } else {
          return res.status(400).json({ email: "Email already exists!" });
        }
      }
    }
  );

  User.findOne({ email: req.body.email }).then((user) => {
    // Create the new user
    const newUser = new User({
      name: req.body.name,
      department: req.body.department,
      email: req.body.email,
      password: req.body.password,
      accessLevel: req.body.accessLevel,
      active: false,
    });

    // Make sure to hash password for DB storage
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser
          .save()
          .then((user) => res.json(user))
          .catch((err) => console.log(err));
      });
    });
  });
};

// @route POST api/users/login
// @desc Login user, return JWT token.
// @access Public
const login = async (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find by email
  User.findOne({ email: req.body.email }).then((user) => {
    // Make sure user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found!" });
    }

    if (user.active == false) {
      return res
        .status(404)
        .json({ emailnotfound: "Account is awaiting approval!" });
    }

    // Check if password is correct
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const payload = {
          id: user.id,
          name: user.name,
        };

        jwt.sign(
          payload,
          secretOrKey,
          { expiresIn: 31556926 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password Incorrect!" });
      }
    });
  });
};

exports.register = register;
exports.login = login;
