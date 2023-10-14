const { initialze, fileExist, updateACL } = require("../helper");
const path = require("path");
const pluralize = require("pluralize");
const files = require("../file.json");
const { exec } = require("child_process");

function auth(moduleName) {
  let rootPath = path.join(process.cwd(), "app");
  let dbPath = path.join(process.cwd(), "app/config/database.js");
  if (!fileExist(rootPath)) {
    console.warn(
      `Please run "easy-node-init setup" cmd for basic configuraiton first`
    );
    return;
  }
  if (!fileExist(dbPath)) {
    console.warn(
      `Please run "easy-node-init db-setup" cmd for basic configuraiton first`
    );
    return;
  }
  let routeName = pluralize(moduleName);
  let capitalModuleName =
    moduleName.charAt(0).toUpperCase() + moduleName.slice(1);
  let replace = [
    {
      find: "**route_name**",
      with: routeName,
    },
    {
      find: "**model_name**",
      with: capitalModuleName,
    },
  ];

  files.auth.map((obj) => {
    initialze(obj, replace);
  });

  updateACL(process.cwd(),"users");

  // setTimeout(() => {
  //   exec("node ./temp/initializer.js", (error, stdout, stderr) => {
  //     if (error) {
  //       console.error(`Error initializer command: ${error}`);
  //     } else {
  //       console.log(`Setup Initial Configuration...`);
  //       console.log("Configuration successfully.");
  //     }
  //     exec("rm ./temp/initializer.js", (error, stdout, stderr) => {});
  //   });
  // }, 2000);
}

function createUser(email, firstName, lastName, password) {
  files.createsuperuser.map((obj) => {
    initialze(obj, []);
  });
  console.log(
    `node ./temp/createsuperuser.js ${email} ${firstName} ${lastName} ${password}`
  );
  setTimeout(() => {
    exec(
      `node ./temp/createsuperuser.js ${email} ${firstName} ${lastName} ${password}`,
      (error, stdout, stderr) => {
        if (error) {
          console.error(`Error initializer command: ${error}`);
        } else {
          console.log(`Super User Created Successfully`);
          // console.log("Configuration successfully.");
        }
        exec("rm ./temp/createsuperuser.js", (error, stdout, stderr) => {});
      }
    );
  }, 2000);
}

module.exports.createUser = createUser;
module.exports.auth = auth;
