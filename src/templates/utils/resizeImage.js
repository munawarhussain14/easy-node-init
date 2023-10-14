const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const processDebugger = require("debug")("app:process");

const resizeImageWithMaxWidth = async (inputPath, outputPath, maxWidth) => {
  try {
    await sharp(inputPath)
      .resize({ width: maxWidth, withoutEnlargement: true })
      .toFile(outputPath);
    processDebugger("Image resized successfully.");
  } catch (error) {
    console.error("Error resizing image:", error);
  }
};

const resizeImage = async (inputPath, outputPath, width, height) => {
  try {
    await sharp(inputPath).resize(width, height).toFile(outputPath);
    processDebugger("Image resized successfully.");
  } catch (error) {
    console.error("Error resizing image:", error);
  }
};

// Middleware for processing image and creating a thumbnail
const processThumbnailImage = async (req, res, next) => {
  if (!req.file) {
    return next(); // No file to process
  }

  // Create a thumbnail of the uploaded image
  const thumbnailPath = path.join(
    __dirname,
    `../../${process.env.UPLOAD_DIR}/uploads/media/thumbnail`,
    req.file.filename
  );

  try {
    await sharp(req.file.path).resize(200, 200).toFile(thumbnailPath);
  } catch (error) {
    return next(error); // Handle any errors during image processing
  }

  req.thumbnailPath = thumbnailPath; // Attach the thumbnail path to the request object
  next();
};

// Middleware for processing image and creating a thumbnail
const processImage = async (inputPath) => {
  // Create a thumbnail of the uploaded image
  const thumbnailPath = inputPath.replace("media", "media\\thumbnail\\");
  processDebugger(`Thumbnail: ${thumbnailPath}`);
  processDebugger(`Input Path: ${inputPath}`);

  try {
    let ext = path.extname(inputPath);
    processDebugger(`File Extension: ${ext}`);
    if (ext === ".jpg" || ext === ".png" || ext === ".png") {
      const imageInfo = await sharp(inputPath).metadata();
      const imageWidth = imageInfo.width;
      processDebugger(`Image Width: ${imageWidth}`);
      if (imageWidth > 20) {
        const resizedImageBuffer = await sharp(inputPath)
          .resize({ width: 200, withoutEnlargement: true })
          .toBuffer();

        fs.writeFileSync(inputPath, resizedImageBuffer);
      }
      await sharp(inputPath).resize(200, 200).toFile(thumbnailPath);
    }
    return {
      success: true,
      message: "Images shrink",
      thumbnailPath,
      imagePath: inputPath,
    };
  } catch (error) {
    processDebugger("File not shrinked:", error);
    return { success: false, message: "File not shrinked" };
  }
};

exports.processImage = processImage;
