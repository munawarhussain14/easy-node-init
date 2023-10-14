/**
 * Create By: easy-node-init
 * Create Date: **create_date**
 */

const express = require("express");
require("express-async-errors");
const validateObjectId = require("../../middleware/validateObjectId");
const auth = require("../../middleware/auth");
const admin = require("../../middleware/admin");
const router = express.Router();
const { fetchAll, fetch, create, update, remove } = require("./controller");

router.get("/modules", [auth, admin], fetchAll);

router.get("/modules/:id", [auth, admin, validateObjectId], fetch);

router.post("/modules", [auth, admin], create);
//If you want to add Auth i.e router.post("/modules", auth, create);

router.put("/modules/:id", [auth, admin, validateObjectId], update);
//If you want to add Auth and Admin i.e router.get("/modules", [auth, admin], update);

router.delete("/modules/:id", [auth, admin, validateObjectId], remove);

module.exports.router = router;

//If true route will be accessable
module.exports.allow = true;
