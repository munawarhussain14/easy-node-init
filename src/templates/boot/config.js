/**
 * Create By: easy-node-init
 * Create Date: **create_date**
 */
const config = require("config");

module.exports = function () {
  if (!config.get("jwtPrivateKey")) {
    throw new Error(`FATEL ERROR: jwtPrivateKey is not defined.`);
  }
};
