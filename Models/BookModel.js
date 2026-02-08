const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  author: {
    type: String,
    required: true,
  },
  noOfPage: {
    type: Number,
    required: true,
  },
  imgURl: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discountedPrice: {
    type: Number,
    required: true,
  },
  abstract: {
    type: String,
    required: true,
  },
  publisher: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  ISBN: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  uploadedImages: {
    type: Array,
    required: true,
  },
  sellerMail: {
    type: String,
    required: true,
  },
  buyerMail: {
    type: string,
    default:''
  },
});

const bookModel = new mongoose.model("books", bookSchema);
module.exports = bookModel;
