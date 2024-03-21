#!/usr/bin/env node
const { program } = require("commander");
const readlineSync = require("readline-sync");
const { auth, createUser } = require("./src/cmd/auth");

program.version("1.0.0").description("Easy Node Initialization Tool");

program
  .command("setup")
  .description("Initialize a new Express project and Database Configuration")
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
    auth("user");
  });

program
  .command("create-next-module <moduleName>")
  .description("Create Nextjs module")
  .action((moduleName) => {
    if (!moduleName) {
      console.error(
        "Please provide a module name i.e node easy-node-init <module name>"
      );
      process.exit(1);
    }
    require("./src/cmd/next-module")(moduleName);
  });

program
  .command("create-super-user")
  .description("Create Super User")
  .action(() => {
    let email, password;
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    do {
      email = readlineSync.question("Enter Email: ");
      if (!emailRegex.test(email)) {
        console.log("Invalid email address. Please try again.");
      }
    } while (!emailRegex.test(email));

    // const email = readlineSync.question("Enter Email: ");
    const firstName = readlineSync.question("Enter First Name: ");
    const lastName = readlineSync.question("Enter Last Name: ");

    do {
      password = readlineSync.question("Enter Password: ", {
        hideEchoBack: true, // This hides the input
        mask: "*", // You can customize the masking character
      });
      if (password.length < 8) {
        console.log(
          "Password must be at least 8 characters long. Please try again."
        );
      }
    } while (password.length < 8);

    createUser(email, firstName, lastName, password);
  });

program.parse(process.argv);
