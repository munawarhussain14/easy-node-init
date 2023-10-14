/**
 * Create By: easy-node-init
 * Create Date: **create_date**
 */

const express = require("express");
require("express-async-errors");
const validateObjectId = require("../../middleware/validateObjectId");
// const auth = require("../../middleware/auth");
// const admin = require("../../middleware/admin");
const router = express.Router();
const { fetchAll, fetch, create, update, remove } = require("./controller");

router.get("/roles", fetchAll);

router.get("/roles/:id", [validateObjectId], fetch);

router.post("/roles", create);
//If you want to add Auth i.e router.post("/roles", auth, create);

router.put("/roles/:id", [validateObjectId], update);
//If you want to add Auth and Admin i.e router.get("/roles", [auth, admin], update);

router.delete("/roles/:id", [validateObjectId], remove);

module.exports.router = router;

//If true route will be accessable
module.exports.allow = true;
