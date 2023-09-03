/**
 * Create By: easy-node-init
 * Create Date: **create_date**
 */
const mongoose = require("mongoose");
const databaseDebugeger = require("debug")("app:db");
const config = require("config");

function database() {
  databaseDebugeger(`Connecting to MongoDB Host: ${config.get("db")}...`);
  mongoose.connect(config.get("db")).then((connection) => {
    databaseDebugeger(
      `Connected to MongoDB Host: ${connection.connection.host}`
    );
  });
}

module.exports = database;
