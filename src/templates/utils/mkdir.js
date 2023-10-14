const path = require("path");
const fs = require("fs");

const mkdir = async (directory) => {
  if (!directory) {
    console.error("Directory not provided");
    return false;
  }

  return new Promise((resolve, reject) => {
    fs.mkdir(directory, { recursive: true }, (err) => {
      if (err) {
        console.error("Error creating directory:", err);
        reject(err); // Reject the promise if there's an error
      } else {
        console.log("Directory created successfully:", directory);
        resolve(true); // Resolve the promise when the directory is created
      }
    });
  });
};

exports.mkdir = mkdir;
