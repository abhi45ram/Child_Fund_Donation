const express=require('express');
const router=express.Router()
const UserModel=require('../models/UserModel')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const isEmail = require("validator/lib/isEmail");
const userPng =
  "https://res.cloudinary.com/indersingh/image/upload/v1593464618/App/user_mklcpl.png";



router.post("/signup", async (req, res) => {
    //console.log("A")
    const {
      username,
      email,
      password,
    } = req.body.formData;
   // console.log(req)
    console.log(username);
    console.log(email);
    console.log(password);
    if (!isEmail(email)) return res.status(401).send("Invalid Email");
  
    if (password.length < 6) {
      return res.status(401).send("Password must be atleast 6 characters");
    }
  
    try {
      let user;
      console.log("a");
      user = await UserModel.findOne({ email: email.toLowerCase() });
      if (user) {
        return res.status(401).send("User already registered");
      }
      
      user = new UserModel({
        name:username,
        email: email.toLowerCase(),
        password:password,
      });
  
      user.password = await bcrypt.hash(password, 10);
      await user.save();
  
      const payload = { userId: user._id };
      console.log(payload)
      jwt.sign(payload, process.env.jwt_Secret, { expiresIn: "2d" }, (err, token) => {
        if (err) throw err;
        res.status(200).json(token);
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send(`Server error`);
    }
  });

  router.post("/login", async (req, res) => {
    const { email, password } = req.body.formData;
    
    if (!isEmail(email)) return res.status(401).send("Invalid Email");
  
    if (password.length < 6) {
      return res.status(401).send("Password must be atleast 6 characters");
    }
  
    try {
      const user = await UserModel.findOne({ email: email.toLowerCase() }).select(
        "+password"
      );
  
      if (!user) {
        return res.status(401).send("Invalid Credentials");
      }
      
      const isPassword = await bcrypt.compare(password, user.password);
      if (!isPassword) {
        return res.status(401).send("Invalid Credentials");
      }
  
      const payload = { userId: user._id };
      console.log(payload)
      jwt.sign(payload, process.env.jwt_Secret, { expiresIn: "2d" }, (err, token) => {
        if (err) throw err;
       
        res.status(200).json(token);
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send(`Server error`);
    }
  });

  module.exports = router;
