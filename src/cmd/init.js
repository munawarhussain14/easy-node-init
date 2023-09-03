const { initialze, fileExist } = require("../helper");
const path = require("path");
const files = require("../file.json");

module.exports = function () {
  let rootPath = path.join(process.cwd(), "app");
  if (fileExist(rootPath)) {
    console.warn(`Initial setup run once`);
    return;
  }
  files.setup.map((obj) => {
    initialze(obj);
  });
};
