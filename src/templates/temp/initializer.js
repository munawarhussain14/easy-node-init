// initialize.js
const mongoose = require("mongoose");
const { Role } = require("../app/modules/roles/model"); // Import your Role model
const { Group } = require("../app/modules/groups/model"); // Import your Group model
const { Module } = require("../app/modules/modules/model"); // Import your Group model
require("dotenv").config({ path: ".env.development" });

// Connect to your MongoDB database
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define default roles and groups
const defaultRoles = [
  { name: "Super Admin", description: "Super Admin role" },
  { name: "Admin", description: "Admin role" },
  { name: "User", description: "User role" },
];

const defaultGroups = [
  { name: "Super Admin", description: "Super Admin team group" },
  { name: "Admin", description: "Admin role" },
  { name: "User", description: "User role" },
];

const defaultModule = [
  { name: "Users", description: "User Module" },
  { name: "Roles", description: "Role Module" },
  { name: "Groups", description: "Group Module" },
  { name: "Modules", description: "Group Module" },
];

// Function to create default roles and groups
async function createDefaultData() {
  try {
    const existingRoles = await Role.find();
    const existingGroups = await Group.find();
    const existingModules = await Module.find();

    if (existingModules.length === 0) {
      await Module.insertMany(defaultModule);
    }

    if (existingRoles.length === 0) {
      const roles = await Role.insertMany(defaultRoles);

      const modules = await Module.find();

      // Loop through groups and modules to set default permissions
      for (const role of roles) {
        let check = true;
        if (role.name === "User") {
          check = false;
        }

        role.modules = modules.map((module) => ({
          moduleId: module._id,
          summary: check,
          detail: check,
          read: check,
          write: check,
          delete: check,
        }));
        await role.save();
      }
    }

    if (existingGroups.length === 0) {
      const groups = await Group.insertMany(defaultGroups);
      // Fetch all modules from the database
      const modules = await Module.find();

      // Loop through groups and modules to set default permissions
      for (const group of groups) {
        let check = true;
        if (group.name === "User") {
          check = false;
        }

        group.modules = modules.map((module) => ({
          moduleId: module._id,
          summary: check,
          detail: check,
          read: check,
          write: check,
          delete: check,
        }));
        await group.save();
      }
    }

    console.log("Default module, roles and groups created successfully.");
  } catch (error) {
    console.error("Error creating default roles and groups:", error);
  } finally {
    // Disconnect from the database when done
    mongoose.disconnect();
  }
}

// Run the function to create default data
createDefaultData();
