#!/usr/bin/env node

const { program } = require("commander");
const readline = require("readline");

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
  
program
  .command("create-super-user")
  .description("Create Super User")
  .action(() => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    let email, firstName, lastName, password;

    // Prompt the user for input
    rl.question("Enter Email: ", (userEmail) => {
      email = userEmail;
      rl.question("Enter First Name: ", (userFirstName) => {
        firstName = userFirstName;
        rl.question("Enter Last Name: ", (userLastName) => {
          lastName = userLastName;
          rl.question("Enter Password: ", (userPassword) => {
            password = userPassword;

            // Close the readline interface
            rl.close();

            // Now you have all the input values, you can create the user or perform other actions
            createUser(email, firstName, lastName, password);
          });
        });
      });
    });
  });

function createUser(email, firstName, lastName, password) {
  // Perform the user creation logic here
  // For example, you can send this data to your API or store it in a database
  console.log("Creating user with the following details:");
  console.log(`Email: ${email}`);
  console.log(`First Name: ${firstName}`);
  console.log(`Last Name: ${lastName}`);
  console.log(`Password: ${password}`);
}
    

program.parse(process.argv);
