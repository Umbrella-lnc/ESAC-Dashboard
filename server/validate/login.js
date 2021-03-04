import Validator from 'validator';
import isEmpty from 'is-empty'

module.exports = function validateLoginInput(data) {
    let errors = {};

    // Convert empty fields to empty strings
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

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

    return {
        errors,
        isValid: isEmpty(errors)
    };
    
};