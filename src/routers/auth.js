const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { validateSignUpData, validateLoginData } = require("../utils/validator");

const authRouter = express.Router();

//POST API: Signup api to store new user data into database

authRouter.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req);

    const { firstName, lastName, emailId, password, gender } = req.body;

    const hashPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashPassword,
    });

    const savedUser = await user.save();

    res
      .status(201)
      .json({ message: "User signup successfully...", data: savedUser });
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
  }
});

//POST: login APi
authRouter.post("/login", async (req, res) => {
  try {
    validateLoginData(req);

    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("Invalid Credentail!!");
    }
   
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(isPasswordValid) {
        res.status(200).send("Login Successfull!!");
    }else{
        throw new Error("Invalid Credentail!!");
    }
  } catch (err) {
    res.status(401).send("ERROR:" + err.message);
  }
});

module.exports = authRouter;
