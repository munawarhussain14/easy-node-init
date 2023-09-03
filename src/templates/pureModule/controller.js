/**
 * Create By: easy-node-init
 * Create Date: **create_date**
 */

// GET: => api/v1/**route_name**
exports.fetchAll = async (req, res) => {
  return res.send({ success: true, data: "**model_name** fetch All" });
};

// GET: => api/v1/**route_name**/:id
exports.fetch = async (req, res) => {
  return res.send({ success: true, data: "**model_name** fetch" });
};

// POST: => api/v1/**route_name**
exports.create = async (req, res) => {
  return res.send({ success: true, data: "**model_name** create" });
};

// PUT: => api/v1/**route_name**
exports.update = async (req, res) => {
  return res.send({ success: true, data: "**model_name** update" });
};

// DELETE: => api/v1/**route_name**
exports.remove = async (req, res) => {
  return res.send({ success: true, data: "**model_name** delete" });
};
