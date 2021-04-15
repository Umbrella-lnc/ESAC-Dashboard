const Validator = require("validator");
const isEmpty = require("is-empty");
const { UnfoldLess } = require("@material-ui/icons");

module.exports = function validateRegiserInput(data) {
    let errors = {};

    const departments = [
        "Mechanical and Aerospace Engineering (MAE)",
        "Civil, Coastal, and Environmental Engineering (ESSIE)",
        "Agricultural and Biological Engineering (ABE)",
        "Biomedical Engineering (BME)",
        "Chemical Engineering (CHEME)",
        "Computer and Information Science and Engineering (CISE)",
        "Electrical and Computer Engineering (ECE)",
        "Industrial and Systems Engineering (ISE)",
        "Materials Science and Engineering (MSE)",
        "Nuclear Engineering (NE)",
    ];

    // Convert empty fields to empty strings
    data.firstname = !isEmpty(data.firstname) ? data.firstname : "";
    data.lastname = !isEmpty(data.lastname) ? data.lastname : "";
    data.department = !isEmpty(data.department) ? data.department : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.confirmPassword = !isEmpty(data.confirmPassword)
        ? data.confirmPassword
        : "";
    data.accessLevel = !isEmpty(data.accessLevel) ? data.accessLevel : "";

    // Validate first name
    if (Validator.isEmpty(data.firstname)) {
        errors.firstname = "First name required!";
    } else if(!Validator.isLength(data.firstname, {min: 1, max: 60 })) {
        errors.firstname = "First name cannot exceed 60 characters!"
    }

    // Validate last name
    if (Validator.isEmpty(data.lastname)) {
        errors.lastname = "Last name field required!";
    } else if(!Validator.isLength(data.lastname, {min: 1, max: 60 })) {
        errors.lastname = "Last name cannot exceed 60 characters!"
    }

    // Validate department
    if (Validator.isEmpty(data.department)) {
        errors.department = "Department field required!";
    } else if (!departments.includes(data.department)) {
        errors.department = "Invalid department!";
    }

    // Validate email
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field required!";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid!";
    } else if (data.email.split("@")[1] !== "ufl.edu") {
        errors.email = "Email requires @ufl.edu domain!";
    } else if (!Validator.isLength(data.email, {min: 1, max: 60 })) {
        errors.email = "Email cannot exceed 60 characters!";
    }

    // Validate password
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field required!";
    }
    if (Validator.isEmpty(data.confirmPassword)) {
        errors.confirmPassword = "Confirm Password field required!";
    }
    if (!Validator.isLength(data.password, { min: 7, max: 60 })) {
        errors.password = "Password must be at least 7 characters long!";
    }
    if (Validator.isAlpha(data.password)) {
        errors.password = "Password must contain at least 1 number!";
    }
    if (Validator.isLowercase(data.password)) {
        errors.password = "Password must contain at least 1 uppercase letter!";
    }
    if (!Validator.equals(data.password, data.confirmPassword)) {
        errors.confirmPassword = "Passwords must match!";
    }

    // Validate Access Level
    const access_levels = ["representative", "administrator"];
    if (Validator.isEmpty(data.accessLevel)) {
        errors.accessLevel = "Access Level must be chosen!";
    } else if (!access_levels.includes(data.accessLevel)) {
        errors.accessLevel = "Invalid access level chosen!";
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};
