/**
 * Create By: easy-node-init
 * Create Date: 10/1/2023, 1:15:49 PM
 */
const fs = require("fs");
const path = require("path");
const { File, validate, validateUpdate } = require("./model");
const Page = require("../../utils/pagination");
const { processImage } = require("../../utils/resizeImage");
const mongoose = require("mongoose");

// GET: => api/v1/files
exports.fetchAll = async (req, res) => {
  const documents = await Page({ req, Model: File, searchColumn: ["name"] });
  return res.send({ success: true, ...documents });
};

// GET: => api/v1/files/:id
exports.fetch = async (req, res) => {
  const document = await File.findById(req.params.id);
  if (!document)
    return res.status(404).send({ message: "Document with id not found" });

  return res.send({ success: true, data: document });
};

// POST: => api/v1/files
exports.create = async (req, res, next) => {
  let result = null;
  const file = req.file;
  const { error } = validate(req.body);

  if (error) {
    fs.unlinkSync(file.path);
    return res.status(400).send({ message: error.details[0].message });
  }

  const { fileType, schema, objectId, featured } = req.body;
  const uniqueFilename = file.filename;

  if (fileType === "gallery") {
    const count = await File.find({ objectId }).count();
    if (count > process.env.UPLOAD_LIMIT) {
      fs.unlinkSync(file.path);
      return res.status(400).send({ message: "Image Upload limit reach" });
    }
  }

  let inputPath = path.join(
    __dirname,
    `../../../${process.env.UPLOAD_DIR}/uploads/media/${uniqueFilename}`
  );
  let ext = path.extname(inputPath);
  let imageResponse = await processImage(inputPath);

  let row = null;

  if (["avatar", "cover"].includes(fileType)) {
    let previousFile = null;
    let previousThumbFile = null;
    row = await File.findOne({
      objectId: objectId,
      fileType: fileType,
    }).lean();
    if (row) {
      // let uploadFile = row.url.split("uploads");
      previousFile = path.join(
        __dirname,
        `../../../${process.env.UPLOAD_DIR}/${row.url}`
      );
      previousThumbFile = path.join(
        __dirname,
        `../../../${process.env.UPLOAD_DIR}/${row.thumbnail}`
      );
      result = await File.findOneAndUpdate(
        {
          objectId: objectId,
          fileType: fileType,
        },
        {
          $set: {
            url: `/uploads/media/${uniqueFilename}`,
            thumbnail: `/uploads/media/thumbnail/${uniqueFilename}`,
            extension: ext,
          },
        },
        {
          new: true, // Return the updated document
        }
      );
      fs.unlinkSync(previousFile);
      fs.unlinkSync(previousThumbFile);
    }
  }

  if (!row) {
    const fileData = {
      url: `/uploads/media/${uniqueFilename}`,
      thumbnail: `/uploads/media/thumbnail/${uniqueFilename}`,
      schema: schema,
      extension: ext,
      objectId: objectId,
      fileType: fileType,
      featured: featured || false,
    };

    const document = new File(fileData);

    result = await document.save();
  }

  // const Model = mongoose.model(result.schema);

  return res.send({
    success: true,
    data: result,
    message: "File uploaded successfully",
  });
};

// PUT: => api/v1/files
exports.update = async (req, res) => {
  const { error } = validateUpdate(req.body);

  if (error) return res.status(400).send({ message: error.details[0].message });

  const document = await File.findById(req.params.id);

  if (!document)
    return res.status(404).send({ message: "Document with id not found" });
  const { featured } = req.body;

  if (featured) {
    await File.updateMany(
      { objectId: document.objectId, _id: { $ne: document._id } },
      { $set: { featured: false } }
    );
  }

  const result = await File.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: req.body,
    },
    { new: true }
  );

  // const Model = mongoose.model(result.schema);

  return res.send({
    success: true,
    data: result,
    message: "File dpdated!",
  });
};

// DELETE: => api/v1/files
exports.remove = async (req, res, next) => {
  const document = await File.findById(req.params.id).lean();
  if (!document)
    return res.status(404).send({ message: "Document with id not found" });

  const result = await File.findByIdAndDelete(req.params.id);
  let previousFile = path.join(
    __dirname,
    `../../../${process.env.UPLOAD_DIR}/${document.url}`
  );
  let previousThumbFile = path.join(
    __dirname,
    `../../../${process.env.UPLOAD_DIR}/${document.thumbnail}`
  );

  if (fs.existsSync(previousFile)) fs.unlinkSync(previousFile);
  if (fs.existsSync(previousThumbFile)) fs.unlinkSync(previousThumbFile);

  return res.send({
    success: true,
    data: result,
    message: "File deleted!",
  });
};
