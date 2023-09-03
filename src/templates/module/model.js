/**
 * Create By: easy-node-init
 * Create Date: **create_date**
 */

const mongoose = require("mongoose");
const Joi = require("joi");

const **model_name** = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    max: 50,
  },
},{
  timestamps:true
});

function validate(data) {
  const schema = Joi.object({
    name: Joi.string().required().min(5).max(20),
  });

  return schema.validate(data);
}


exports.validate = validate;
exports.**model_name** = mongoose.model("**model_name**", **model_name**);
