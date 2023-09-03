/**
 * Create By: easy-node-init
 * Create Date: **create_date**
 */
const mongoose = require("mongoose");

module.exports = function (req, res, next) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).send("Invalid ID");
  }

  next();
};
