const Validator = require("validator");
const isEmpty = require("is-empty");
const User = require("../models/User");

module.exports = function validateRegiserInput(data) {
    let errors = {};

    //Check for title and department associated
    data.user_id = !isEmpty(data.user_id) ? data.user_id : "";
    data.title = !isEmpty(data.title) ? data.title : "";
    data.department = !isEmpty(data.department) ? data.department : "";

    // Validate department
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

    if (Validator.isEmpty(data.department)) {
        errors.department = "Department field required!";
    } else if (!departments.includes(data.department)) {
        errors.department = "Invalid department!";
    }

    //Validate title
    if (Validator.isEmpty(data.title)) {
        errors.title = "Title field is required!";
    }

    //Validate id
    if (Validator.isEmpty(data.user_id)) {
        errors.user_id = "User id not received!";
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};
