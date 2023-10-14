const multer = require("multer");
const ErrorHandler = require("./errorHandler");
const path = require("path");
const fs = require("fs");
const { mkdir } = require("./mkdir");

function storage(directory = "files") {
  directory = `./${process.env.UPLOAD_DIR}/uploads/${directory}`;
  mkdir(directory);

  return multer({
    storage: multer.diskStorage({
      destination: (req, file, callback) => {
        callback(null, directory);
        // Define the directory where uploaded files will be stored
      },
      filename: (req, file, callback) => {
        callback(null, Date.now() + "-" + file.originalname);
        // Define the file name
      },
    }),
    fileFilter: (req, file, next) => {
      let ext = path.extname(file.originalname);
      if (ext !== ".jpg" && ext !== ".png" && ext !== ".png") {
        next(new ErrorHandler("File type not supported", 415));
        return;
      }
      next(null, 200);
    },
  });
}

function storageMemory() {
  const storage = multer.memoryStorage();
  return multer({ storage: storage });
}

module.exports.media = storage;
module.exports.memory = storageMemory;
