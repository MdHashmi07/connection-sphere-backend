const mongoose = require('mongoose');
const validator = require("validator");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require("dotenv").config();




const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        minLength: 2,
        maxLength: 50

    },
    lastName: {
        type:String,
        required:true,
        trim: true,
        minLength: 2,
        maxLength: 50
    },
    emailId:{
        type:String,
        required:true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error("Email is not valid!");
            }
        }
    },
    password:{
        type:String,
        required:true,
        trim: true,
        validate(value) {
            if(!validator.isStrongPassword(value)){
                throw new Error("Password is not Strong example: { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1}");
            }
        }
    },
    age: {
        type:Number,
        min: 18
    },
    gender: {
        type:String,
        lowercase: true,
        validate(value) {
            if(!["male", "female", "other"].includes(value)){
                throw new Error("Invalide Gender");
            }
        }
    },
    about: {
        type:String,
        default: "This is a default about of user",
        trim: true
    },
    photoUrl: {
        type:String,
        default: "https://img.icons8.com/?size=100&id=tZuAOUGm9AuS&format=png&color=000000",
        validate(value) {
            if(!validator.isURL(value)){
                throw new Error("Invalid photo url");
            }
        }
    }
},
{
    timestamps: true
}
);

userSchema.methods.getJWT = async function() {
    const user = this;
    const token = await jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: "7d"});
    return token;
}

userSchema.methods.validatePassword = async function(passwordInputByUser) {
    const user = this;
    const hashPassword = user.password;

    const isPasswordValid = await bcrypt.compare(passwordInputByUser, hashPassword);

    return isPasswordValid;

}

const User = mongoose.model('User', userSchema);
module.exports = User;