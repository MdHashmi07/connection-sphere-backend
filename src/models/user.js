const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type:String,
        required:true
    },
    emailId:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    age: {
        type:Number
    },
    gender: {
        type:String
    },
    about: {
        type:String,
        // default: "This is a default about of user",
    },
    photoUrl: {
        typr:String,
        // default: "https://t4.ftcdn.net/jpg/08/58/51/05/240_F_858510556_HSGNbjxLHjKTC5QM18V5BR7ZFLFRNk5j.jpg",
    }
},
{
    timestamps: true
}
);

const User = mongoose.model('User', userSchema);
module.exports = User;