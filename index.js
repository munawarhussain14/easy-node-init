#!/usr/bin/env node

const { program } = require("commander");
const fs = require("fs");
const path = require("path");
const rootPath = process.cwd();
const pluralize = require("pluralize");

program.version("1.0.0").description("Easy Node Initialization Tool");

program
  .command("init")
  .description("Initialize a new Express project")
  .action(() => {
    console.log("Path=======", rootPath);
    // require("./src/cmd/init")(rootPath);
  });

program
  .command("create-module <moduleName>")
  .description("Create module")
  .action((moduleName) => {
    const routeName = pluralize(moduleName);
    if (!moduleName) {
      console.error(
        "Please provide a module name i.e node easy-node-cli <module name>"
      );
      process.exit(1);
    }
    // require("./src/cmd/mongo-module")(rootPath, moduleName, routeName);
  });

program
  .command("auth")
  .description("Create Auth module")
  .action(() => {
    // require("./src/cmd/auth")(rootPath, "user", "users");
  });
program.parse(process.argv);
