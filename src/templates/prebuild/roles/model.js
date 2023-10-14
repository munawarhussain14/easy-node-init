/**
 * Create By: easy-node-init
 * Create Date: **create_date**
 */

const mongoose = require("mongoose");
const Joi = require("joi");

const Role = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      max: 50,
    },
    modules: [
      {
        moduleId: { type: mongoose.Schema.Types.ObjectId, ref: "Module" },
        summary: {
          type: Boolean,
          default: true,
        },
        detail: {
          type: Boolean,
          default: true,
        },
        read: {
          type: Boolean,
          default: true,
        },
        write: {
          type: Boolean,
          default: true,
        },
        delete: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

function validate(data) {
  const schema = Joi.object({
    name: Joi.string().required().min(5).max(20),
    summary: Joi.boolean(),
    detail: Joi.boolean(),
    read: Joi.boolean(),
    write: Joi.boolean(),
    delete: Joi.boolean(),
  });

  return schema.validate(data);
}

exports.validate = validate;
exports.Role = mongoose.model("Role", Role);
