const path = require("path");
const { fileExist, initialze } = require("../helper");
const files = require("../file.json");
const {updatePacakge} = require("../helper");

module.exports = function () {
  let rootPath = path.join(process.cwd(), "app");
  if (!fileExist(rootPath)) {
    console.warn(
      `Please run "easy-node-init setup" cmd for basic configuraiton first`
    );
    return;
  }
  files.setupDB.map((obj) => {
    initialze(obj);
  });
  updatePacakge(process.cwd());
  console.log("Update Package....");
};
