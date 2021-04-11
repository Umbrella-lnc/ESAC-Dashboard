const Validator = require("validator");
const isEmpty = require("is-empty");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports = function validateEmail(data) {
    let errors = {};

    data.to = !isEmpty(data.to) ? data.to : "";
    data.title = !isEmpty(data.title) ? data.title : "";
    data.post = !isEmpty(data.post) ? data.post : "";

    //Validate from email
    if (Validator.isEmpty(data.to)) {
        errors.to = "Email field required!";
    } else if (!Validator.isEmail(data.to)) {
        errors.to = "Email is invalid!";
    } else if (data.to.split("@")[1] !== "ufl.edu") {
        errors.to = "Email requires @ufl.edu domain!";
    }

    //Validate title
    if (Validator.isEmpty(data.title)) {
        errors.title = "Title field required!";
    }
    //Validate post
    if (Validator.isEmpty(data.post)) {
        errors.post = "Post field required!";
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};
