const { initialze, fileExist } = require("../helper");
const path = require("path");
const pluralize = require("pluralize");
const files = require("../file.json");

module.exports = function (moduleName) {
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
      find: "**model_dir**",
      with: routeName,
    },
    {
      find: "**model_name**",
      with: capitalModuleName,
    },
  ];
  files.createModule.map((obj) => {
    obj.destination = obj.destination.replace("<module>", routeName);

    initialze(obj, replace);
  });
};
