const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { validateSignUpData, validateLoginData } = require("../utils/validator");
const jwt = require("jsonwebtoken");
const userAuth = require("../middlewares/userAuth");

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
    const token = await savedUser.getJWT();

    res.cookie('token', token, {expires: new Date(Date.now() + 8 * 3600000)});

    res
      .status(201)
      .json({ message: "User registered successfully...", data: savedUser });
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

    const isPasswordValid = await user.validatePassword(password)

    if (isPasswordValid) {
      const token = await user.getJWT();
      res.cookie("token", token, {expires: new Date(Date.now() + 7 * 3600000)});

      res.status(200).json({message:"Login Successfull!!",
        user: {
          _id: user._id,
          firstName: user.firstName,
          emailId: user.emailId
        }
      });
    } else {
      throw new Error("Invalid Credentail!!");
    }
  } catch (err) {
    res.status(401).send("ERROR:" + err.message);
  }
});

//GET: Logout API

authRouter.get("/logout", userAuth,  async (req, res) => {
  try {
    res.cookie("token", null, {expires: new Date(Date.now())})
    res.status(200).json({message: "Logout successfully"});
   
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

module.exports = authRouter;
