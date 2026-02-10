const {
  registerUser,
  loginUser,
  googleLogin,
} = require("./Controllers/AuthController"); //importing registeruser from authcontroller
const express = require("express"); //importing express
const JWTMiddleware = require("./MiddleWares/JWTMiddleware");
const multerConfig = require("./MiddleWares/multerMiddleware");
const {
  addBook,
  getAllBooks,
  getLimitedBooks,
} = require("./Controllers/BookController");
const router = express.Router(); //calling router from express

router.post("/registerUser", registerUser);
router.post("/loginUser", loginUser);
router.post("/googleLogin", googleLogin);
router.post(
  "/addBook",
  JWTMiddleware,
  multerConfig.array("uploadedImages"),
  addBook,
);
router.get("/getAllBooks", JWTMiddleware, getAllBooks);
router.get("/getLimitedBooks", getLimitedBooks);

module.exports = router; //exportinging router
