const User = require("../models/User");
const Announcement = require("../models/Announcement");

// @route POST api/announcements/createAnnouncement
// @desc Create an announcement
// @access Admin
//  + req.user => current logged in user object
//  + req.body.title
//  + req.body.post
const createAnnouncement = async (req, res) => {

};


// @route POST api/announcements/deleteAnnouncement
// @desc Delete an announcement by object ID
// @access Admin
//  + req.user => current logged in user object
//  + req.body.announcementID => announcement ID to delete
const deleteAnnouncement = async (req, res) => {

};


// @route GET api/announcements/getAnnouncements
// @desc Return all announcements of ESAC
// @access User
// @req
//  + req.user => current logged in user object
const getAnnouncements = async (req, res) => {

};

exports.createAnnouncement = createAnnouncement;
exports.deleteAnnouncement = deleteAnnouncement;
exports.getAnnouncements = getAnnouncements;
