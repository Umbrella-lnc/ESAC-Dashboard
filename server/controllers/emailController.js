const nodemailer = require("nodemailer");
const User = require("../models/User");

const validateEmail = require("../validate/email");

const transporter = nodemailer.createTransport({
    service: "gmail", // no need to set host or port etc.
    auth: {
        user: "emailer.esac@gmail.com",
        pass: process.env.email_password,
    },
});

// @route POST api/emails/sendEmail
// @desc Send an Email to the 'to' person
// @access Admin
//  + req.user => current logged in user object
//  + req.body.to
//  + req.body.title
//  + req.body.post
const sendEmail = async (req, res) => {
    const { errors, isValid } = validateEmail(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    if (req.user.accessLevel != "administrator") {
        res.status(403).json({
            invalid_permission: "You do not have send e-mail!",
        });
    }

    let mailOptions = {
        from: "emailer.esac@gmail.com",
        to: req.body.to,
        subject: req.body.title,
        text: req.body.post,
    };

    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            return res.status(400).json({
                email: "Something went wrong!",
            });
        } else {
            return res.status(200).json({
                email: "Successfully Sent!",
            });
        }
    });
};

// Called as a function, not in a route. Ensure use after admin authorization.
// @desc Send an Email to all ESAC users who did not opt out
//  + req.body.title
//  + req.body.post
const announcementEmail = async (req) => {
    const { title, post } = req.body;

    User.find()
        .then((users) => {
            mailList = [];

            //Go through all users in database and add them to mailing list if they are not opted out
            users.forEach((user) => {
                if (!user.email_opt_out && user.active) {
                    mailList.push(user.email);
                }
            });

            let mailOptions = {
                from: "emailer.esac@gmail.com",
                to: mailList,
                subject: title,
                text: post,
            };

            transporter.sendMail(mailOptions, function (err, data) {
                if (err) {
                    console.log(err);
                }
            });
        })
        .catch((error) => {
            console.log(error);
        });
};

exports.sendEmail = sendEmail;
exports.announcementEmail = announcementEmail;
