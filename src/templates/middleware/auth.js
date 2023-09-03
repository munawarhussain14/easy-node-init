/**
 * Create By: easy-node-init
 * Create Date: **create_date**
 */
const jwt = require("jsonwebtoken");
const config = require("config");

function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token)
    return res
      .status(401)
      .send({ success: false, message: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = decoded;
    next();
  } catch (er) {
    res.status(400).send({ success: false, message: "Invalid token." });
  }
}

module.exports = auth;
