/**
 * Create By: easy-node-init
 * Create Date: **create_date**
 */
module.exports = function (err, req, res, next) {
  res.status(500).send({
    success: false,
    message: "Server error please contact administrator",
    stack: err,
  });
};
