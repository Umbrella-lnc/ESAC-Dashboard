const Validator = require("validator");
const isEmpty = require("is-empty");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports = function validateCommentInput(req) {
    let errors = {};

    let comment = "";
    if ("comment" in req.body) {
        comment = req.body.comment;
    }

    //Validate comment length
    if (Validator.isEmpty(comment)) {
        errors.comment_length = "Comment length must be greater than 0!";
    }

    //Validate id
    if (!ObjectId.isValid(req.body.reflectionID)) {
        errors.reflectionID = "Invalid reflectionID!";
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};
