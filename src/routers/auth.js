const express = require('express');
const User = require('../models/user');

const authRouter = express.Router();

//POST API: Signup api to store new user data into database

authRouter.post('/signup', async(req, res) => {
    try {
        const { firstName, lastName, emailId, password} = req.body;

        const user  = new User({
            firstName,
            lastName,
            emailId,
            password
        });

        const savedUser = await user.save();

        res.json({message: "User signup successfully...", data:savedUser});

    }catch(error) {
        res.status(400).send("ERROR : " + error.message);
    }
});

module.exports = authRouter;