/**
 * Create By: easy-node-init
 * Create Date: **create_date**
 */
const jwt = require("jsonwebtoken");
const acl = require("../config/acl.json");

module.exports.auth = (module = "none", nextFn = "none") => {
  return (req, res, next) => {
    const token = req.header("x-auth-token");
    if (!token)
      return res.status(401).send({
        success: false,
        message: "Invalid or expired token. Please log in again.",
      });

    if (module === "none") {
      res.status(403).send({
        success: false,
        message: "You do not have permission to perform this operation.",
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.user = decoded;
      if (acl[req.user.role][module][nextFn]) {
        next();
      } else {
        res.status(403).send({
          success: false,
          message: "You do not have permission to perform this operation.",
        });
      }
    } catch (er) {
      res.status(401).send({
        success: false,
        message: "Invalid or expired token. Please log in again.",
      });
    }
  };
};
