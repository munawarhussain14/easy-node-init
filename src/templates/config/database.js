/**
 * Create By: easy-node-init
 * Create Date: **create_date**
 */
const mongoose = require("mongoose");
const databaseDebugeger = require("debug")("app:db");

function database() {
  databaseDebugeger(`Connecting to MongoDB Host: ${process.env.DATABASE_URL}...`);
  mongoose.connect(process.env.DATABASE_URL).then((connection) => {
    databaseDebugeger(
      `Connected to MongoDB Host: ${connection.connection.host}`
    );
  });
}

module.exports = database;
