/**
 * Create By: easy-node-init
 * Create Date: **create_date**
 */

const express = require("express");
require("express-async-errors");
const validateObjectId = require("../../middleware/validateObjectId");
// const {auth} = require("../../middleware/auth");
// const admin = require("../../middleware/admin");
const router = express.Router();
const { fetchAll, fetch, create, update, remove } = require("./controller");

router.get("/**route_name**", fetchAll);

router.get("/**route_name**/:id", [validateObjectId], fetch);

router.post("/**route_name**", create);
//If you want to add Auth i.e router.post("/**route_name**", auth, create);

router.put("/**route_name**/:id", [validateObjectId], update);
//If you want to add Auth and Admin i.e router.get("/**route_name**", [auth, admin], update);

router.delete("/**route_name**/:id", [validateObjectId], remove);

module.exports.router = router;

//If true route will be accessable
module.exports.allow = true;
