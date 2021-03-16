const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const validateRegiserInput = require("../validate/register");
const validateLoginInput = require("../validate/login");
const dotenv = require("dotenv");
const passport = require("../config/passport");
const { db } = require("../models/User");

dotenv.config();
const secretOrKey = process.env.secretOrKey;

// @route POST api/usersManagementController/toggleVerifiedStatus
// @desc Register a user in the database
// @access Admin
const toggleVerifiedStatus = async (req, res) => {
    //Look into creating super admins
    if (req.user.accessLevel != "administrator") {
        return res.status(401).json({
            unauthorized: "Need administrator privileges to verify users!",
        });
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
            console.log(user);
            //Look into using update to flip state without reading prev. state
            user.save()
                .then(() => {
                    res.status(200).json({ success: "Toggled user access!" });
                })
                .catch((err) =>
                    res.status(500).json({
                        failure: "Internal error, could not update db.",
                    })
                );
        }
    });
};

// @route POST api/usersManagementController/deleteUser
// @desc Delete a user from the database
// @access Admin
const deleteUser = async (req, res) => {
    // Verify that the user has access level "administrator"
    if (req.user.accessLevel != "administrator") {
        return res.status(400).json({
            accessLevel: "Need administrator privileges to delete user!",
        });
    }

    // Make sure the user actually exists in the database
    User.findOne({ email: req.body.email }).then((user) => {
        if (!user) {
            return res.status(404).json({ emailnotfound: "Email not found!" });
        } else {
            User.findOneAndRemove({ email: req.body.email }).then((email) => {
                res.json({ success: true });
            });
        }
    });
};

exports.toggleVerifiedStatus = toggleVerifiedStatus;
exports.deleteUser = deleteUser;