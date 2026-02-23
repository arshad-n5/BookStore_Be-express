const {
  registerUser,
  loginUser,
  googleLogin,
  getAllUsers,
  getUserDetails,
  updateProfile,
} = require("./Controllers/AuthController"); //importing registeruser from authcontroller
const express = require("express"); //importing express
const JWTMiddleware = require("./MiddleWares/JWTMiddleware");
const multerConfig = require("./MiddleWares/multerMiddleware");
const {
  addBook,
  getAllBooks,
  getLimitedBooks,
  getSingleBook,
} = require("./Controllers/BookController");
const JWTAdminMiddleware = require("./MiddleWares/JWTAdminMiddleware");
const router = express.Router(); //calling router from express

//user
router.post("/registerUser", registerUser);
router.post("/loginUser", loginUser);
router.post("/googleLogin", googleLogin);
router.get("/getUserDetails", JWTMiddleware, getUserDetails);
router.get("/getAllUsers", JWTAdminMiddleware, getAllUsers);
router.put(
  "/:id/updateUser",
 JWTMiddleware,
  multerConfig.single("proPic"),
  updateProfile,
);

//books
router.post(
  "/addBook",
  JWTMiddleware,
  multerConfig.array("uploadedImages"),
  addBook,
);
router.get("/getAllBooks", JWTMiddleware, getAllBooks);
router.get("/getLimitedBooks", getLimitedBooks);
router.get("/:id/getSingleBook", JWTMiddleware, getSingleBook);

module.exports = router; //exportinging router
