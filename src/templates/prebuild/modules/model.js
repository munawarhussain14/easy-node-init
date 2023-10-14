/**
 * Create By: easy-node-init
 * Create Date: **create_date**
 */

const mongoose = require("mongoose");
const Joi = require("joi");

const Module = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    max: 100,
  },
  description: String
},{
  timestamps:true
});

function validate(data) {
  const schema = Joi.object({
    name: Joi.string().required().min(5).max(20),
    description: Joi.string().min(5).max(500),
  });

  return schema.validate(data);
}


exports.validate = validate;
exports.Module = mongoose.model("Module", Module);
