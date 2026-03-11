const { json } = require("express");
const bookModel = require("../Models/BookModel");
const { disconnect } = require("mongoose");
const stripe = require("stripe")(process.env.stripeSecret);

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

exports.getAllBooks = async (req, res) => {
  try {
    let searchKey = req.query.searchKey;
    let pattern = {
      title: {
        $regex: searchKey,
        $options: "i",
      },
    };
    let allBooks = await bookModel.find(pattern);
    res.status(200).json(allBooks);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong in the server" });
  }
};

exports.getLimitedBooks = async (req, res) => {
  try {
    let limitedBooks = await bookModel.find().limit(4);
    res.status(200).json(limitedBooks);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong in server" });
  }
};

exports.getSingleBook = async (req, res) => {
  try {
    let { id } = req.params;
    let bookData = await bookModel.findById({ _id: id });
    res.status(200).json(bookData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong in server" });
  }
};

exports.buyBook = async (req, res) => {
  try {
    let buyerMail = req.userMail;
    let id = req.params.id;
    let bookDetails = await bookModel.findByIdAndUpdate(
      { _id: id },
      { buyerMail },
      { new: true },
    );
    let actualPrice = bookDetails.discountedPrice;
    let line_items = [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: bookDetails.title,
            description: bookDetails.abstract,
            images: bookDetails.image && bookDetails.image.length <= 2048 ? [bookDetails.image] : [],
            metadata: {
              title: bookDetails.title,
              sellerMail: bookDetails.sellerMail,
              bookId: id,
              price: bookDetails.price,
              discountPrice: bookDetails.discountedPrice,
              buyerMail: buyerMail,
            },
          },
          unit_amount: Math.round(actualPrice * 100),
        },
        quantity: 1,
      },
    ];
    let session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `http://localhost:5173/payment-success`,
      cancel_url: `http://localhost:5173/payment-failure`,
    });
    res.status(200).json(session);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong in the server" });
  }
};
