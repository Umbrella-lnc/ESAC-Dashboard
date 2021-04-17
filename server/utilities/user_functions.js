const jwt = require("jsonwebtoken");
const User = require("../models/User");
const dotenv = require("dotenv");
dotenv.config();
const secretOrKey = process.env.secretOrKey;

const saveUserSendCookie = (user, res) => {
    //Save user
    user.save()
        .then(() => {
            const payload = {
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                department: user.department,
                email: user.email,
                accessLevel: user.accessLevel,
                active: user.active,
                email_opt_out: user.email_opt_out,
            };

            //Send back token
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
        .catch((err) =>
            res.status(500).json({
                failure: "Internal error, could not update db.",
            })
        );
};

module.exports = saveUserSendCookie;
