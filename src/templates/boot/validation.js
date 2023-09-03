/**
 * Create By: easy-node-init
 * Create Date: **create_date**
 */

const Joi = require("joi");

module.exports = function () {
  Joi.objectId = require("joi-objectid")(Joi);
};
