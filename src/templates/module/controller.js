/**
 * Create By: easy-node-init
 * Create Date: **create_date**
 */

const {**model_name**, validate} = require("./model");
const Page = require("../../utils/pagination");

// GET: => api/v1/**route_name**
exports.fetchAll = async (req, res) => {
  const documents = await Page({ req, Model: **model_name**, searchColumn: ["name"] });
  return res.send({ success: true, ...documents });
};

// GET: => api/v1/**route_name**/:id
exports.fetch = async (req, res) => {
  const document = await **model_name**.findById(req.params.id);
  if (!document)
    return res.status(404).send({ message: "Document with id not found" });

  return res.send({ success: true, data: document });
};

// POST: => api/v1/**route_name**
exports.create = async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send({ message: error.details[0].message });

  const document = new **model_name**({ ...req.body });

  const result = await document.save();

  return res.send({
    success: true,
    data: result,
    message:"**model_name** created!"
  });
};

// PUT: => api/v1/**route_name**
exports.update = async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send({ message: error.details[0].message });

  const document = await **model_name**.findById(req.params.id);

  if (!document)
    return res.status(404).send({ message: "Document with id not found" });

  const result = await **model_name**.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: req.body,
    },
    { new: true }
  );

  return res.send({
    success: true,
    data: result,
    message: "**model_name** dpdated!",
  });
};

// DELETE: => api/v1/**route_name**
exports.remove = async (req, res) => {
  const result = await **model_name**.findByIdAndDelete(req.params.id);
  return res.send({
    success: true,
    data: result,
    message: "**model_name** deleted!",
  });
};
