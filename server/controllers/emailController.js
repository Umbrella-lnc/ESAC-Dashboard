const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

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
            invalid_permission: "You do not have access to post comments!",
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

exports.sendEmail = sendEmail;
