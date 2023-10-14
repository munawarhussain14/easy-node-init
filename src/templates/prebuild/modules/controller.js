/**
 * Create By: easy-node-init
 * Create Date: **create_date**
 */

const {Module, validate} = require("./model");
const Page = require("../../utils/pagination");

// GET: => api/v1/modules
exports.fetchAll = async (req, res) => {
  const documents = await Page({ req, Model: Module, searchColumn: ["name"] });
  return res.send({ success: true, ...documents });
};

// GET: => api/v1/modules/:id
exports.fetch = async (req, res) => {
  const document = await Module.findById(req.params.id);
  if (!document)
    return res.status(404).send({ message: "Document with id not found" });

  return res.send({ success: true, data: document });
};

// POST: => api/v1/modules
exports.create = async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send({ message: error.details[0].message });

  const document = new Module({ ...req.body });

  const result = await document.save();

  return res.send({
    success: true,
    data: result,
    message:"Module created!"
  });
};

// PUT: => api/v1/modules
exports.update = async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send({ message: error.details[0].message });

  const document = await Module.findById(req.params.id);

  if (!document)
    return res.status(404).send({ message: "Document with id not found" });

  const result = await Module.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: req.body,
    },
    { new: true }
  );

  return res.send({
    success: true,
    data: result,
    message: "Module dpdated!",
  });
};

// DELETE: => api/v1/modules
exports.remove = async (req, res) => {
  const result = await Module.findByIdAndDelete(req.params.id);
  return res.send({
    success: true,
    data: result,
    message: "Module deleted!",
  });
};
