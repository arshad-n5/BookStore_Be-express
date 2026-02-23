const jwt = require("jsonwebtoken");

const JWTAdminMiddleware = (req, res, next) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let decoded = jwt.verify(token, process.env.jwtSecret);
    if (decoded) {
      if (decoded.userType == "Admin") {
        next();
      } else {
        res
          .status(401)
          .json({ message: "this operation can only be done by admin" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};

module.exports = JWTAdminMiddleware;
