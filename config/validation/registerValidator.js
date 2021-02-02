const Validator = require("validator");
const isEmpty = require("./isEmpty");
//register validation

module.exports = function validateRegisterData(data) {
    let errors = {};
    data.first_name = !isEmpty(data.first_name) ? data.first_name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    //check for if condition for true else throw error

    if (!Validator.isAlpha(data.first_name)) {
        errors.first_name = "First name only string";
    }
    if (Validator.isEmpty(data.first_name)) {
        errors.name = "Username is required";
    }
    if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    }
    if (!Validator.isLength(data.password, { min: 4, max: 30 })) {
        errors.password = "Password must be at least 4 characters";
    }

    if (!Validator.isInt(data.password, { min: 2, max: 5 })) {
        errors.password = "Password must include minimum 2 number.";
    }
    return {
        errors,
        isValid: isEmpty(errors),
    };
};
