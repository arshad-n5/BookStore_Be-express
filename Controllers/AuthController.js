const { json } = require("express");
const userModel = require("../Models/UserModel"); //importing usermodel from models
const jwt = require("jsonwebtoken");


//using named exports usig exports keyword
exports.registerUser = async (req, res) => {
  try {
    // use the same spelling as in the user model
    let userName = req.body.userName; //accessing the data received from the api through req body
    let email = req.body.email;
    let password = req.body.password;
    // use await for every communication with database
    let existingUser = await userModel.findOne({ email: email }); //checking if the email already exist in the data base using findone
    if (existingUser) {
      res
        .status(409)
        .json({ message: "user with this email id already exists" }); //409 is used for client side conflict error message
    } else {
      let newUser = new userModel({ userName, email, password });
      await newUser.save();
      res
        .status(201)
        .json({ message: "SuccessFully registered new User", newUser });
    }
  } catch (error) {
    console.log(error); // for the develeoper
    res.status(500).json({ message: "Something Went Wring in Server" }); //setting the status to 500 using res.status and giving a message to front end using json
  }
};

exports.loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;
    let existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      if (existingUser.password == password) {
        let payload = {
          email: existingUser.email,
          userType: existingUser.userType,
        };
        let token = jwt.sign(payload, process.env.jwtSecret); //sign is a jwt method to encode data the arguments are data and a secret key which is stored in env
        res.status(200).json({ message: "succesfully logged in ", token });
      } else {
        res.status(401).json({ message: "Invalid Password" });
      }
    } else {
      res.status(404).json({
        message: "User with this email id does not exist...,Please Register",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something Went Wring in Server" });
  }
};

exports.googleLogin = async (req, res) => {
  try {
    let { userName, email, proPic } = req.body;
    let existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      //login logic
      let payload = {
        email: existingUser.email,
        userType: existingUser.userType,
      };
      let token = jwt.sign(payload, process.env.jwtSecret); //sign is a jwt method to encode data the arguments are data and a secret key which is stored in env
      res.status(200).json({ message: "succesfully logged in ", token });
    } else {
      //register + login
      let newUser = new userModel({
        userName,
        email,
        proPic,
        password: "sdffhdkfjs",
      });
      await newUser.save();
      let payload = {
        email: newUser.email,
        userType: newUser.userType,
      };
      let token = jwt.sign(payload, process.env.jwtSecret); //sign is a jwt method to encode data the arguments are data and a secret key which is stored in env
      res.status(200).json({ message: "succesfully logged in ", token });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ messsage: "something went wrong in google log-in" });
  }
};
