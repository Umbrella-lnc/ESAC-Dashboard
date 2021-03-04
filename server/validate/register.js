import Validator from 'validator';
import isEmpty from 'is-empty'

module.exports = function validateRegiserInput(data) {
    let errors = {};

    // Convert empty fields to empty strings
    data.name = !isEmpty(data.name) ? data.name : "";
    data.department = !isEmpty(data.department) ? data.department : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword : "";
    data.accessLevel = !isEmpty(data.accessLevel) ? data.accessLevel : "";

    // Validate name
    if(Validator.isEmpty(data.name)) {
        errors.name = "Name field required!";
    }

    // Validate department
    if(Validator.isEmpty(department.name)) {
        errors.name = "Department field required!";
    }

    // Validate email
    if(Validator.isEmpty(data.email)) {
        errors.email = "Email field required!";
    }
    else if(!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid!";
    }

    // Validate password
    if(Validator.isEmpty(data.password)) {
        errors.password = "Password field required!";
    }
    if(Validator.isEmpty(data.confirmPassword)) {
        errors.confirmPassword = "Confirm Password field required!";
    }
    if(!Validator.isLength(data.password, { min: 7, max: 30 })) {
        errors.password = "Password must be at least 7 characters long!";
    }
    if(Validator.isAlpha(data.password)) {
        errors.password = "Password must contain at least 1 number!";
    }
    if(Validator.isLowercase(data.password)) {
        errors.password = "Password must contain at least 1 uppercase letter!";
    }
    if(!Validator.equals(data.password, data.confirmPassword)) {
        errors.confirmPassword = "Passwords must match!";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
    
};