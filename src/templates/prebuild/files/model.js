/**
 * Create By: easy-node-init
 * Create Date: 10/1/2023, 1:15:49 PM
 */

const mongoose = require("mongoose");
const Joi = require("joi");
const absoluteUrl = require("../../utils/absoluteUrl");
const updateImage = require("../../utils/mediaModelOperation");

const typeEnum = ["avatar", "cover", "gallery"];

const File = new mongoose.Schema(
  {
    fileType: {
      type: String,
      enum: typeEnum, // Define the allowed enum values
      required: true, // Make the field required
    },
    schema: String,
    objectId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "schema", // Reference the appropriate schema dynamically
    },
    extension: {
      type: String,
    },
    url: {
      type: String,
      get: absoluteUrl,
    },
    thumbnail: {
      type: String,
      get: absoluteUrl,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    approved: {
      type: Boolean,
      default: false,
    },
    attach: {
      type: Boolean,
      default: false,
    },
    description: String,
  },
  {
    timestamps: true,
    toJSON: { getters: true },
  }
);

File.methods.reference = async function () {
  const Model = mongoose.model(this.schema);
  const data = await Model.findById(this.objectId);
  return data;
};

File.post("save", async function (doc) {
  if (this.skipPostSave) {
    return;
  }
  const check = await updateImage(doc, "add", "save");
});

File.pre("remove", async function (next) {
  if (this.skipPreSave) {
    return next();
  }

  const check = await updateImage(this, "delete", "remove");
  if (check.success) {
    next();
  } else {
    next(check.error);
  }
});

function validate(data) {
  const schema = Joi.object({
    fileType: Joi.string()
      .valid(...typeEnum)
      .required()
      .label("Type"),
    schema: Joi.string().required().label("Schema"),
    objectId: Joi.string().required().label("Object Id"),
    url: Joi.string().label("Image URL"),
    thumbnail: Joi.string().label("Thumbnail URL"),
    featured: Joi.boolean().label("Featured"),
    approved: Joi.boolean().label("Approved"),
    description: Joi.string().min(5).max(500),
  });

  return schema.validate(data);
}

function validateUpdate(data) {
  const schema = Joi.object({
    fileType: Joi.string()
      .valid(...typeEnum)
      .label("Type"),
    schema: Joi.string().label("Schema"),
    objectId: Joi.string().label("Object Id"),
    url: Joi.string().label("Image URL"),
    featured: Joi.boolean().label("Featured"),
    approved: Joi.boolean().label("Approved"),
    description: Joi.string().min(5).max(500),
  });

  return schema.validate(data);
}

exports.typeEnum = typeEnum;
exports.validate = validate;
exports.validateUpdate = validateUpdate;
exports.File = mongoose.model("File", File);
