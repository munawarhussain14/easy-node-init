// const fs = require("fs");
const path = require("path");
const multer = require("multer");
const ErrorHandler = require("./errorHandler");
const { mkdir } = require("./mkdir");

const storage = multer.diskStorage({
  destination: async (req, file, next) => {
    const uploadPath = path.join(
      __dirname,
      `../../${process.env.UPLOAD_DIR}/uploads/media`
    );
    const thumbnailUploadPath = path.join(
      __dirname,
      `../../${process.env.UPLOAD_DIR}/uploads/media/thumbnail`
    );
    await mkdir(uploadPath);
    await mkdir(thumbnailUploadPath);
    next(null, uploadPath);
  },
  fileFilter: (req, file, next) => {
    let ext = path.extname(file.originalname);

    if (ext !== ".jpg" && ext !== ".png" && ext !== ".png") {
      next(new ErrorHandler("File type not supported", 415));
      return;
    }
    next(null, 200);
  },
  filename: (req, file, next) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".png" && ext !== ".png") {
      return next(new ErrorHandler("File type not supported", 415));
    }
    const uniqueFilename = Date.now() + "-" + file.originalname;

    next(null, uniqueFilename);
  },
});

exports.upload = multer({ storage: storage });
