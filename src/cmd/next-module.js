const { initialze, fileExist, updateACL } = require("../helper");
const path = require("path");
const pluralize = require("pluralize");
const files = require("../file.json");

module.exports = function (moduleName) {
  let rootPath = path.join(process.cwd(), "app");
  let dbPath = path.join(process.cwd(), "next.config.js");
  if (!fileExist(rootPath)) {
    console.warn(`Please run "eni setup" cmd for basic configuraiton first`);
    return;
  }
  if (!fileExist(dbPath)) {
    console.warn(`Not a Nextjs project commond not recommended`);
    return;
  }
  let singular = moduleName;

  let singularCapital = singular.charAt(0).toUpperCase() + singular.slice(1);

  let plural = pluralize(singular);

  let pluralCapital = plural.charAt(0).toUpperCase() + plural.slice(1);

  let replace = [
    {
      find: "**schema_name**",
      with: singular + "Schema",
    },
    {
      find: "**service_name**",
      with: singular,
    },
    {
      find: "**route_name**",
      with: plural,
    },
    {
      find: "** interface_name **",
      with: singularCapital,
    },
    {
      find: "**interface_dir**",
      with: singular,
    },
  ];
  files.nextjs.module.map((obj) => {
    obj.destination = obj.destination.replace("<module>", routeName);
    initialze(obj, replace);
  });
  updateACL(process.cwd(), routeName);
};
