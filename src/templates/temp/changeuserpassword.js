// createuser.js
const mongoose = require("mongoose");
const { User } = require("../app/modules/users/model"); // Import your Role model
const hashPassword = require("../app/utils/hashPassword");
require("dotenv").config({ path: ".env.development" });

// Connect to your MongoDB database
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Function to create default roles and groups
async function createDefaultData(email, password) {
  try {
    let role = await Role.findOne({ name: "Super Admin" });
    let user = await User.findOne({
      email,
    });
    if (user) {
      user.password = await hashPassword(password);

      await user.save();
      console.log("Password Change successfully.");
      return;
    } else {
      console.log(`User with ${email} not exist.`);
      return;
    }
  } catch (error) {
    console.error("Error creating superuser:", error);
  } finally {
    // Disconnect from the database when done
    mongoose.disconnect();
  }
}

// Run the function to create default data
createDefaultData(process.argv[2], process.argv[3]);
