const validator = require("validator");

const validateSignUpData = (req) => {
    const {firstName, lastName, emailId, password} = req.body;

    if(!firstName || !lastName) {
        throw new Error("Enter your name");
    }

    if(!emailId || !validator.isEmail(emailId)){
        throw new Error("Invalid Email Id");
    }

    if(!password || !validator.isStrongPassword(password)) {
        throw new Error("Password is not strong");
    }
}

const validateLoginData = (req) => {
    const {emailId, password} = req.body;

    if(!emailId || !password) {
       throw new Error("Email and password are required" )
    }
}

module.exports = {validateSignUpData, validateLoginData}