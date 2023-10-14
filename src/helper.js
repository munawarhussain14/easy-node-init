const fs = require("fs");
const path = require("path");
const { boot } = require("./file.json");

exports.initialze = async function (data, replace = []) {
  const { boot, call, source, destination, file, require_path, args } = data;
  let check = await createDir(destination);
  if (check) {
    let destination_file = path.join(destination, file);
    if (!fileExist(destination_file)) {
      let newFile = await readFile(source, file);
      let currentDate = new Date();

      let replacer = [
        {
          find: "**create_date**",
          with: currentDate.toLocaleString(),
        },
        ...replace,
      ];
      newFile = updateFile(newFile, replacer);
      let writeCheck = writeFile(destination_file, newFile);
      if (writeCheck) {
        console.log(`File created: ${destination_file}`);
        if (boot) {
          if (require_path) {
            let [name] = file.split(".");

            let code;
            let filePath = `${require_path}/${file}`
              .replace("\\", "/")
              .replace("//", "/");
            // console.log("require_file_path:", require_file_path); // Output: ../middleware
            // console.log("filePath:", filePath); // Output: ../middleware

            if (call) {
              if (args) {
                code = `require("${filePath}")(${args.join(
                  ","
                )});\n/**end-line */`;
              } else {
                code = `require("${filePath}")();\n/**end-line */`;
              }
            } else {
              code = `let ${name} = require("${filePath}");\n\tapp.use(${name});\n/**end-line */`;
            }
            let data = [
              {
                find: "/**end-line */",
                with: code,
              },
            ];
            addToBoot(data);
          }
        }
      }
    } else {
      console.log(`Already exist: ${destination_file}`);
    }
  }
};

function fileExist(source) {
  return fs.existsSync(source);
}

module.exports.fileExist = fileExist;

function createDir(directory) {
  if (directory) {
    let fullPath = process.cwd();
    fullPath = path.join(fullPath, directory);
    if (!fs.existsSync(fullPath)) {
      fs.mkdir(fullPath, { recursive: true }, (err) => {
        if (err) {
          console.error("Error creating directory:", err);
          return false;
        } else {
          console.log("Directory created successfully.", fullPath);
          return true;
        }
      });
    }
    return true;
  }
  console.error(`Directory not created`);
  return false;
}

async function readFile(source, file) {
  let cwd = __dirname;
  try {
    source = path.join(cwd, source, file);
    return await fs.readFileSync(source, "utf-8");
  } catch (err) {
    throw err;
  }
}

function updateFile(file, replacements) {
  // console.log("replacements", replacements,file);
  replacements.map((replacement) => {
    const find = `${replacement.find}`;
    file = file.split(find).join(replacement.with);
  });

  return file;
}

function writeFile(destination, file) {
  try {
    destination = path.join(process.cwd(), destination);

    // Ensure the directory exists, creating it if necessary
    const directory = path.dirname(destination);
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }

    // Write the file
    fs.writeFileSync(destination, file);
    return true;
  } catch (err) {
    console.error("Error", err);
    return false;
  }
}

function addToBoot(replacements) {
  let boot_path = path.join(process.cwd(), boot);
  if (!fileExist(boot_path)) {
    console.warn(`boot.js File not exist`);
    return;
  }

  let templateFile = fs.readFileSync(boot_path, "utf-8");

  // Replace placeholders in the template
  if (replacements != null) {
    templateFile = updateFile(templateFile, replacements);
  }

  // Create controller.js with the updated template
  writeFile(boot, templateFile);
  console.log(`boot.js File updated`);
  return true;
}

exports.updatePacakge = function (rootDir) {
  // Load the package.json file
  const packagePath = path.join(rootDir, "package.json");
  const packageJson = require(packagePath);

  // Update the test script
  packageJson.scripts.start = "nodemon server.js";
  packageJson.scripts.test =
    "jest --watchAll --verbose --coverage --maxWorkers=1";

  // Write the updated package.json file
  fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
};

exports.updateACL = function (rootDir, module) {
  // Load the package.json file
  const aclPath = path.join(rootDir, "/app/config/acl.json");
  let aclJson = require(aclPath);

  if (module === "users") {
    // Update the test script
    aclJson.superadmin[module] = {
      fetchAll: true,
      fetch: true,
      create: true,
      update: true,
      remove: true,
      avatar: true,
      me: true,
      changePassword: true,
      deactivate: true,
    };
    aclJson.admin[module] = {
      avatar: false,
      fetch: false,
      fetchAll: false,
      me: true,
      update: true,
      changePassword: true,
      deactivate: true,
    };
    aclJson.user[module] = {
      avatar: true,
      fetch: false,
      fetchAll: false,
      me: true,
      update: true,
      changePassword: true,
      deactivate: true,
    };
  } else {
    // Update the test script
    aclJson.superadmin[module] = {
      fetchAll: true,
      fetch: true,
      create: true,
      update: true,
      remove: true,
    };
    aclJson.admin[module] = {
      fetchAll: true,
      fetch: true,
      create: true,
      update: true,
      remove: true,
    };
    aclJson.user[module] = {
      fetchAll: true,
      fetch: true,
      create: true,
      update: true,
      remove: true,
    };
  }

  // Write the updated acl.json file
  fs.writeFileSync(aclPath, JSON.stringify(aclJson, null, 2));
};
