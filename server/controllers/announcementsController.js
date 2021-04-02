const User = require("../models/User");
const Announcement = require("../models/Announcement");
const validateAnnouncement = require("../validate/announcement");

// @route POST api/announcements/createAnnouncement
// @desc Create an announcement
// @access Admin
//  + req.user => current logged in user object
//  + req.body.title
//  + req.body.post
const createAnnouncement = async (req, res) => {
    // Form Validation
    const { errors, isValid } = validateAnnouncement(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    //Check database for valid user
    User.findOne({ _id: req.user._id })
        .then((user) => {
            // Make sure user exists
            if (!user) {
                return res
                    .status(404)
                    .json({ user_not_found: "User not found!" });
            } else if (user.accessLevel != "administrator") {
                return res
                    .status(403)
                    .json({ invalid_permission: "You do not have permission to post announcements!" });
            } else {
                //make announcement and add to database
                const newAnnouncement = new Announcement({
                    title: req.body.title,
                    post: req.body.post,
                    poster: user._id,
                    date: new Date()
                });

                newAnnouncement
                    .save()
                    .then((announcement) => res.json(announcement))
                    .catch((err) => console.log(err));
            }
        })
        .catch((err) => {
            res.status(400).json({ bad_user_id: "Invalid user id!" });
        });
};


// @route POST api/announcements/deleteAnnouncement
// @desc Delete an announcement by object ID
// @access Admin
//  + req.user => current logged in user object
//  + req.body.announcementID => announcement ID to delete
const deleteAnnouncement = async (req, res) => {
    //Check database for valid user
    User.findOne({ _id: req.user._id })
        .then((user) => {
            // Make sure user exists
            if (!user) {
                return res
                    .status(404)
                    .json({ user_not_found: "User not found!" });
            } else if (user.accessLevel != "administrator") {
                return res
                    .status(403)
                    .json({ invalid_permission: "You do not have permission to delete announcements!" });
            } else {
                Announcement.findByIdAndDelete(req.body.announcementID, (err) => {
                    if (err) {
                        return res
                            .status(400)
                            .json({ announcement_not_found: "Announcement not found!" });
                    } else {
                        console.log("Deleted announcement ID " + req.body.announcementID);
                        res.json({ success: true });
                    }
                }).catch((err) => {
                    res.status(400).json({ bad_announcement_id: "Invalid Announcement ID passed in request!" });
                });
            }
        })
        .catch((err) => {
            res.status(400).json({ bad_user_id: "Invalid user id!" });
        }); 
};


// @route GET api/announcements/getAnnouncements
// @desc Return all announcements of ESAC
// @access User
// @req
//  + req.user => current logged in user object
const getAnnouncements = async (req, res) => {    
    //Check database for valid user
    User.findOne({ _id: req.user._id })
        .then((user) => {
            // Make sure user exists
            if (!user) {
                return res
                    .status(404)
                    .json({ user_not_found: "User not found!" });
            } else {
                Announcement.find()
                .then((announcements) => {
                    return res.json(announcements);
                })
                .catch((error) => {
                    return res.send(error);
                });
            }
        })
        .catch((err) => {
            res.status(400).json({ bad_user_id: "Invalid user id!" });
        });
};

exports.createAnnouncement = createAnnouncement;
exports.deleteAnnouncement = deleteAnnouncement;
exports.getAnnouncements = getAnnouncements;
