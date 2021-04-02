const Validator = require("validator");
const isEmpty = require("is-empty");
const User = require("../models/User");

module.exports = function validateAnnouncement(data) {
    let errors = {};

    //Check for title and department associated
    data.title = !isEmpty(data.title) ? data.title : "";
    data.post = !isEmpty(data.post) ? data.post : "";

    //Validate title
    if (Validator.isEmpty(data.title)) {
        errors.title = "Title field is required!";
    }
    
    //Validate post
    if (Validator.isEmpty(data.post)) {
        errors.title = "Post field is required!";
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};
