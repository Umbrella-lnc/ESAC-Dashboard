const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegiserInput(req) {
    let errors = {};

    // Convert empty fields to empty strings
    //req.body.comment = !isEmpty() ? req.body.comment : "";

    //Validate comment length
    if (Validator.isEmpty(req.body.comment)) {
        errors.comment_length = "Comment length must be greater than 0!";
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};
