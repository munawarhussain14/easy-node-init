const { initialze, fileExist } = require("../helper");
const path = require("path");
const files = require("../file.json");
const { exec } = require("child_process");

module.exports = async function () {
  let rootPath = path.join(process.cwd(), "app");
  if (fileExist(rootPath)) {
    console.warn(`Initial setup run once`);
    return;
  }

  console.log(`Installing necessary packages...`);
  exec(
    "npm i dotenv multer sharp cors express express-async-errors helmet lodash jest supertest joi joi-objectid morgan bcrypt jsonwebtoken mongoose",
    (error, stdout, stderr) => {
      if (error) {
        console.error(`Error running npm command: ${error}`);
      } else {
        console.log(`Setup files.....`);
        console.log("Packages installed successfully.");
        console.log("Setup files.");
        files.setup.map((obj) => {
          initialze(obj);
        });
        require("../cmd/init-db")();
      }
    }
  );
};
