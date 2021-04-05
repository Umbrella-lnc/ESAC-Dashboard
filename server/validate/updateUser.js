const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateUpdateUser(data) {
    let errors = {};

    // Convert empty fields to empty strings
    data.firstname = !isEmpty(data.firstname) ? data.firstname : "";
    data.lastname = !isEmpty(data.lastname) ? data.lastname : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.confirmPassword = !isEmpty(data.confirmPassword)
        ? data.confirmPassword
        : "";

    // Validate name

    // Validate email
    if (!Validator.isEmpty(data.email)) {
        if (!Validator.isEmail(data.email)) {
            errors.email = "Email is invalid!";
        } else if (data.email.split("@")[1] !== "ufl.edu") {
            errors.email = "Email requires @ufl.edu domain!";
        }
    }

    // Validate password
    if (!Validator.isEmpty(data.password)) {
        if (Validator.isEmpty(data.confirmPassword)) {
            errors.confirmPassword = "Confirm Password field required!";
        }
        if (!Validator.isLength(data.password, { min: 7, max: 30 })) {
            errors.password = "Password must be at least 7 characters long!";
        }
        if (Validator.isAlpha(data.password)) {
            errors.password = "Password must contain at least 1 number!";
        }
        if (Validator.isLowercase(data.password)) {
            errors.password =
                "Password must contain at least 1 uppercase letter!";
        }
        if (!Validator.equals(data.password, data.confirmPassword)) {
            errors.confirmPassword = "Passwords must match!";
        }
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};
