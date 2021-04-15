const User = require("../models/User");
const Comment = require("../models/Comment");
const Reflection = require("../models/Reflection");
const validateReflection = require("../validate/reflection");
const validateComment = require("../validate/comment");


// @route POST api/reflections/createReflection
// @desc Create a reflection in the database
// @access Admin
//  + req.user => current logged in user object
//  + req.body.title
//  + req.body.department
const createReflection = async (req, res) => {
    // Form Validation
    const { errors, isValid } = validateReflection(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    //Check databse for valid user
    User.findOne({ _id: req.user._id })
        .then((user) => {
            // Make sure user exists
            if (!user) {
                return res
                    .status(404)
                    .json({ not_found: "User not found!" });
            } else if (user.accessLevel != "administrator") {
                return res
                    .status(403)
                    .json({ invalid_permission: "You do not have permission to create reflections!" });
            } else {
                //make reflection and add to database
                const newReflection = new Reflection({
                    title: req.body.title,
                    link: req.body.link,
                    department: req.body.department,
                    status: "Incomplete",
                    post: req.body.post,
                    poster: user._id,
                    date: new Date(),
                    comments: [],
                });

                newReflection
                    .save()
                    .then((reflection) => res.json(reflection))
                    .catch((err) => console.log(err));
            }
        })
        .catch((err) => {
            res.status(400).json({ bad_id: "Invalid user id!" });
        });
};

// @route POST api/reflections/deleteReflection
// @desc Delete a reflection in the database by ID
// @access Admin
//  + req.user => current logged in user object
//  + req.body.reflectionID => reflection ID to delete
const deleteReflection = async (req, res) => {
    //Check database for valid user
    User.findOne({ _id: req.user._id })
        .then((user) => {
            // Make sure user exists
            if (!user) {
                return res
                    .status(404)
                    .json({ not_found: "User not found!" });
            } else if (user.accessLevel != "administrator") {
                return res
                    .status(403)
                    .json({ invalid_permission: "You do not have permission to delete reflections!" });
            } else {
                Reflection.findByIdAndDelete(req.body.reflectionID, (err) => {
                    if (err) {
                        return res
                            .status(400)
                            .json({ not_found: "Reflection not found!" });
                    } else {
                        console.log("Deleted reflection ID " + req.body.reflectionID);
                        res.json({ success: true });
                    }
                }).catch((err) => {
                    res.status(400).json({ bad_id: "Invalid Reflection ID passed in request!" });
                });
            }
        })
        .catch((err) => {
            res.status(400).json({ bad_id: "Invalid user id!" });
        }); 
};

// @route POST api/reflections/commentOnReflection
// @desc Comment on a reflection by ID
// @access User
// @req
//  + req.user => current logged in user object
//  + req.body.reflectionID => reflection ID to comment on
//  + req.body.comment => the comment data
const commentOnReflection = async (req, res) => {
    //Verify Input
    const { errors, isValid } = validateComment(req);

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
                    .json({ not_found: "User not found!" });
            } else {
                Reflection.findById(req.body.reflectionID)
                .then((reflection) => {
                    if (!reflection) {
                        return res
                            .status(404)
                            .json({ not_found: "Reflection not found!" });
                    } else {
        
                        const newComment = {
                            poster: req.user._id,
                            comment: req.body.comment,
                            dateposted: new Date(),
                        };
        
                        //reflection.updateOne(req)
                        reflection.comments.push(newComment);
                        reflection.save();
        
                        return res.json({ success: true });
                    }
                })
                .catch((err) => {
                    res.status(400).json({ bad_id: "Invalid reflection id!" });
                });
            }
        })
        .catch((err) => {
            res.status(400).json({ bad_id: "Invalid user id!" });
        }); 
};

// @route GET api/reflections/getDepartmentReflections
// @desc Return all reflections in the department of user
// @access User
// @req
//  + req.user => current logged in user object
const getDepartmentReflections = async (req, res) => {
    //Check database for valid user
    User.findOne({ _id: req.user._id })
        .then((user) => {
            // Make sure user exists
            if (!user) {
                return res
                    .status(404)
                    .json({ not_found: "User not found!" });
            } else {
                Reflection.find({ department: req.user.department })
                .then((reflections) => {
                    if (!reflections) {
                        return res
                            .status(404)
                            .json({ not_found: "Department not found!" });
                    } else {
                        return res.json(reflections);
                    }
                })
                .catch((error) => {
                    return res.send(error);
                });
            }
        })
        .catch((err) => {
            res.status(400).json({ bad_id: "Invalid user id!" });
        });
};

// @route GET api/reflections/getAllReflections
// @desc Return all reflections in the database
// @access Admin
// @req
//  + req.user => current logged in user object
const getAllReflections = async (req, res) => {

    //Check database for valid user
    User.findOne({ _id: req.user._id })
        .then((user) => {
            // Make sure user exists
            if (!user) {
                return res
                    .status(404)
                    .json({ not_found: "User not found!" });
            } else if (user.accessLevel != "administrator") {
                return res
                    .status(403)
                    .json({ invalid_permission: "You do not have permission to get all reflections!" });
            } else {
                Reflection.find()
                .then((reflections) => {
                    return res.json(reflections);
                })
                .catch((error) => {
                    return res.send(error);
                });
            }
        })
        .catch((err) => {
            res.status(400).json({ bad_id: "Invalid user id!" });
        });
};

const toggleStatus = async (req, res) => {
    if (req.user.accessLevel != "administrator") {
        return res.status(404).json({
            accessLevel:
                "Need administrator privileges to get all reflections!",
        });
    }
    Reflection.findById(req.body.reflectionID)
        .then((reflection) => {
            if (!reflection) {
                return res.status(400).json({
                    status: "Invalid Status!",
                });
            } else {
                if (reflection.status === "Complete") {
                    reflection.status = "Incomplete";
                } else {
                    reflection.status = "Complete";
                }
                reflection.save();

                return res.json({ success: true });
            }
        })
        .catch((err) => {
            res.status(500).json({
                error: "Something went wrong! Please contact server owner.",
            });
        });
};

exports.createReflection = createReflection;
exports.deleteReflection = deleteReflection;
exports.commentOnReflection = commentOnReflection;
exports.getDepartmentReflections = getDepartmentReflections;
exports.getAllReflections = getAllReflections;
exports.toggleStatus = toggleStatus;
