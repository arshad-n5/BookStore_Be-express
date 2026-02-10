const { json } = require("express");
const bookModel = require("../Models/BookModel");

exports.addBook = async (req, res) => {
  try {
    let sellerMail = req.userMail;
    let {
      title,
      author,
      noOfPage,
      imgURl,
      price,
      discountedPrice,
      abstract,
      publisher,
      language,
      ISBN,
      category,
      uploadedImages,
    } = req.body;
    let images = req.files.map((eachFiles) => eachFiles.filename);
    if (
      sellerMail &&
      title &&
      author &&
      noOfPage &&
      imgURl &&
      price &&
      discountedPrice &&
      abstract &&
      publisher &&
      language &&
      ISBN &&
      category &&
      images
    ) {
      //proceed to api call
      let newbook = new bookModel({
        sellerMail,
        title,

        author,
        noOfPage,
        imgURl,
        price,
        discountedPrice,
        abstract,
        publisher,
        language,
        ISBN,
        category,
        uploadedImages: images,
      });
      await newbook.save();
      res.status(201).json(newbook);
    } else {
      res.status(400).json({ message: "please fill the feilds..." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong in server" });
  }
};
