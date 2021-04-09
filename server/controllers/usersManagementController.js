const User = require("../models/User");
const validateUpdateUser = require("../validate/updateUser");
const isEmpty = require("is-empty");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const secretOrKey = process.env.secretOrKey;

// @route POST api/usersManagementController/toggleVerifiedStatus
// @desc Register a user in the database
// @access Admin
const toggleVerifiedStatus = async (req, res) => {
  //Look into creating super admins
  if (req.user.accessLevel != 'administrator') {
    return res.status(401).json({
      unauthorized: 'Need administrator privileges to verify users!',
    })
  }

    // Make sure the user actually exists in the database
    User.findOne({ email: req.body.email }).then((user) => {
        if (!user) {
            return res
                .status(400)
                .json({ doesnotexist: "User does not exist!" });
        } else {
            //Change to toggle functionality later
            user.active = !user.active;
            //Look into using update to flip state without reading prev. state
            user.save()
                .then(() => {
                    res.status(200).json({ success: "Toggled user access!" });
                    console.log(
                        "Toggled user " +
                            user.email +
                            " to active: " +
                            user.active
                    );
                })
                .catch((err) =>
                    res.status(500).json({
                        failure: "Internal error, could not update db.",
                    })
                );
        }
    });
};

// @route POST api/usersManagementController/updateUser
// @desc Update user info
// @access Admin
const updateUser = async (req, res) => {
    //Verification
    const { errors, isValid } = validateUpdateUser(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ _id: req.user._id }).then((user) => {
        if (!user) {
            return res.status(404).json({ userNotFound: "User not found!" });
        } else {
            //Update the fields based on what is empty
            if (!isEmpty(req.body.firstname)) {
                user.firstname = req.body.firstname;
            }
            if (!isEmpty(req.body.lastname)) {
                user.firstname = req.body.lastname;
            }
            if (!isEmpty(req.body.email)) {
                user.email = req.body.email;
            }
            if (!isEmpty(req.body.password)) {
                // Make sure to hash password for DB storage
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(req.body.password, salt, (err, hash) => {
                        if (err) throw err;
                        user.password = hash;
                    });
                });
            }

            //Save user
            user.save()
                //Send user new token
                .then((user) => {
                    const payload = {
                        id: user.id,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        department: user.department,
                        email: user.email,
                        accessLevel: user.accessLevel,
                        active: user.active,
                    };

                    jwt.sign(
                        payload,
                        secretOrKey,
                        { expiresIn: 31556926 },
                        (err, token) => {
                            res.json({
                                success: true,
                                token: "Bearer " + token,
                                user,
                            });
                        }
                    );
                })
                .catch((err) => console.log(err));
        }
    });
};

// @route POST api/usersManagementController/deleteUser
// @desc Delete a user from the database
// @access Admin
const deleteUser = async (req, res) => {
  // Verify that the user has access level "administrator"
  if (req.user.accessLevel != 'administrator') {
    return res.status(400).json({
      accessLevel: 'Need administrator privileges to delete user!',
    })
  }

  // Make sure the user actually exists in the database
  User.findOne({ email: req.body.email }).then((user) => {
    if (!user) {
      return res.status(404).json({ emailnotfound: 'Email not found!' })
    } else {
      User.findOneAndRemove({ email: req.body.email }).then((email) => {
        res.json({ success: true })
      })
    }
  })
}

// @route GET api/usersManagementController/listUsers
// @desc Return all users in the database
// @access Admin
const listUsers = async (req, res) => {
    // Verify that the user has access level "administrator"
    if (req.user.accessLevel != "administrator") {
        return res.status(400).json({
            accessLevel: "Need administrator privileges to delete user!",
        });
    }

    // Make sure the user actually exists in the database
    User.find()
        .then((users) => {
            return res.json(users);
        })
        .catch((error) => {
            return res.send(error);
        });
};

const getAllNamesWithID = async (req, res) => {
    User.find()
        .then((users) => {
            let usersMap = {};
            users.forEach((user) => {
                usersMap[user._id] = {
                    firstname: user.firstname,
                    lastname: user.lastname,
                };
            });

            return res.json(usersMap);
        })
        .catch((error) => {
            return res.send(error);
        });
};

exports.toggleVerifiedStatus = toggleVerifiedStatus;
exports.deleteUser = deleteUser;
exports.listUsers = listUsers;
exports.getAllNamesWithID = getAllNamesWithID;
exports.updateUser = updateUser;
