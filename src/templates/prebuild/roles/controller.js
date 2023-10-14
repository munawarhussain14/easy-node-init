/**
 * Create By: easy-node-init
 * Create Date: **create_date**
 */

const {Role, validate} = require("./model");
const Page = require("../../utils/pagination");

// GET: => api/v1/roles
exports.fetchAll = async (req, res) => {
  const documents = await Page({ req, Model: Role, searchColumn: ["name"] });
  return res.send({ success: true, ...documents });
};

// GET: => api/v1/roles/:id
exports.fetch = async (req, res) => {
  const document = await Role.findById(req.params.id);
  if (!document)
    return res.status(404).send({ message: "Document with id not found" });

  return res.send({ success: true, data: document });
};

// POST: => api/v1/roles
exports.create = async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send({ message: error.details[0].message });

  const document = new Role({ ...req.body });

  const result = await document.save();

  return res.send({
    success: true,
    data: result,
    message:"Role created!"
  });
};

// PUT: => api/v1/roles
exports.update = async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send({ message: error.details[0].message });

  const document = await Role.findById(req.params.id);

  if (!document)
    return res.status(404).send({ message: "Document with id not found" });

  const result = await Role.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: req.body,
    },
    { new: true }
  );

  return res.send({
    success: true,
    data: result,
    message: "Role dpdated!",
  });
};

// DELETE: => api/v1/roles
exports.remove = async (req, res) => {
  const result = await Role.findByIdAndDelete(req.params.id);
  return res.send({
    success: true,
    data: result,
    message: "Role deleted!",
  });
};
