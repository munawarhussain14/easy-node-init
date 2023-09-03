/**
 * Create By: easy-node-init
 * Create Date: **create_date**
 */
module.exports = function (req, res, next) {
  if (!req.user.isAdmin)
    return res.status(403).send({ success: false, message: "Access denied." });
  next();
};
