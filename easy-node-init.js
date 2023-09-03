#!/usr/bin/env node

const { program } = require("commander");

program.version("1.0.0").description("Easy Node Initialization Tool");

program
  .command("setup")
  .description("Initialize a new Express project")
  .action(() => {
    require("./src/cmd/init")();
  });

program
  .command("db-setup")
  .description("Initialize a new Express project")
  .action(() => {
    require("./src/cmd/init-db")();
  });

program
  .command("create-module <moduleName>")
  .description("Create module")
  .action((moduleName) => {
    if (!moduleName) {
      console.error(
        "Please provide a module name i.e node easy-node-init <module name>"
      );
      process.exit(1);
    }
    require("./src/cmd/mongo-module")(moduleName);
  });

program
  .command("create-controller <controllerName>")
  .description("Create controller")
  .action((controllerName) => {
    if (!controllerName) {
      console.error(
        "Please provide a controller name i.e node easy-node-init <controller name>"
      );
      process.exit(1);
    }
    require("./src/cmd/add-controller")(controllerName);
  });

program
  .command("auth")
  .description("Create Auth module")
  .action(() => {
    require("./src/cmd/auth")("user");
  });
program.parse(process.argv);
