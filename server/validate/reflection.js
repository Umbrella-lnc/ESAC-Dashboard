const Validator = require("validator");
const isEmpty = require("is-empty");
const User = require("../models/User");

module.exports = function validateReflection(data) {
    let errors = {};

    //Check for title and department associated
    data.title = !isEmpty(data.title) ? data.title : "";
    data.post = !isEmpty(data.post) ? data.post : "";
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
    //Validate post
    if (Validator.isEmpty(data.post)) {
        errors.title = "Title field is required!";
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};
