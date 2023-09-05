/**
 * Create By: easy-node-init
 * Create Date: **create_date**
 */

const express = require("express");
require("express-async-errors");
const router = express.Router();
const { get } = require("./controller");

router.get("/", get);

module.exports.router = router;

//If true route will be accessable
module.exports.allow = true;
