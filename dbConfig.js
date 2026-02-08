const mongoose = require("mongoose"); //install momgoose and import

mongoose
  .connect(process.env.connectionString)
  .then(() => {
    console.log("succesfullly connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  }); //connect mongoose using .connect to mongoDB, returns a promise use then and catch to handle the promise
