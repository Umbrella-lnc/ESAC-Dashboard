const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegiserInput(data) {
    let errors = {};

    // Convert empty fields to empty strings
    data.poster = !isEmpty(data.poster) ? data.poster : "";
    data.dateposted = !isEmpty(data.dateposted) ? data.dateposted : "";

    // Validate name
    if (Validator.isEmpty(data.poster)) {
        errors.firstname = "Poster ID field required!";
    }
    if (Validator.isEmpty(data.dateposted)) {
        errors.lastname = "Date is required!";
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};
