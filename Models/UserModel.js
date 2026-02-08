const mongoose = require("mongoose"); //importing mongoose

const userSchema = mongoose.Schema({
  //creating a userschema to define the schema using mongoose.Schema and passing the schema as a key value pairs
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  proPic: {
    type: String,
    default: "",
  },
  bio: {
    type: String,
    default: "Book store user",
  },
  userType: {
    type: String,
    default: "user",
  },
});

const userModel = mongoose.model("users", userSchema); //declaring usermodel using mongoose.Model and passing the collection name as users and userSchema

module.exports = userModel; // exporting the file usimg common js exporing
