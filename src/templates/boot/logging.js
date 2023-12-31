/**
 * Create By: easy-node-init
 * Create Date: **create_date**
 */

require("express-async-errors");

module.exports = function () {
  process.on("uncaughtException", (ex) => {
    throw ex;
  });

  process.on("unhandleRejection", (ex) => {
    process.exit(1);
  });
};
