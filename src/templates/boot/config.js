/**
 * Create By: easy-node-init
 * Create Date: **create_date**
 */
module.exports = function () {
  if (!process.env.SECRET_KEY) {
    throw new Error(`FATEL ERROR: jwtPrivateKey is not defined.`);
  }
};
