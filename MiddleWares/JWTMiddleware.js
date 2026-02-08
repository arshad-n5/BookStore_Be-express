const jwt = require("jsonwebtoken");

const JWTMiddleware = (req, res, next) => {
  let token = req.headers.authorization.split(" ")[1];
  console.log(token);
  if (token) {
    try {
      let decoded = jwt.verify(token, process.env.jwtSecret);
      //console.log(decoded);
      if (decoded) {
        //token is created by encoding email and usertype,decoded data conatins user email and usertype which might be needed in controller
        req.userMail = decoded.email;
        next();
      } else {
        res.status(401).json({ message: "invalid token, please log in again" });
      }
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "something went wrong while validating token" });
    }
  } else {
    res.status(400).json({ message: "token not found" });
  }
};

module.exports = JWTMiddleware;
