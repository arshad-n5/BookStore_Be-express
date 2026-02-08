const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./Uploads");
  },
  filename: (req, file, cb) => {
    let date = Date.now();
    cb(null, `bookstore-${date}-${file.originalname}`);
  },
});

const FileFilter = (req, file, cb) => {
  if (
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const multerConfig = multer({ storage, FileFilter });
module.exports = multerConfig;
