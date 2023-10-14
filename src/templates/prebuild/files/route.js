/**
 * Create By: easy-node-init
 * Create Date: 10/1/2023, 1:15:49 PM
 */

const express = require("express");
require("express-async-errors");
const validateObjectId = require("../../middleware/validateObjectId");
const { upload } = require("../../utils/fileStorage");
// const auth = require("../../middleware/auth");
// const admin = require("../../middleware/admin");
const router = express.Router();
const { fetchAll, fetch, create, update, remove } = require("./controller");

router.get("/files", fetchAll);

router.get("/files/:id", [validateObjectId], fetch);

router.post("/files", upload.single("image"), create);
//If you want to add Auth i.e router.post("/files", auth, create);

router.put("/files/:id", [validateObjectId], update);
//If you want to add Auth and Admin i.e router.get("/files", [auth, admin], update);

router.delete("/files/:id", [validateObjectId], remove);

module.exports.router = router;

//If true route will be accessable
module.exports.allow = true;
