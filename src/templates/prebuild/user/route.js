/**
 * Create By: easy-node-init
 * Create Date: **create_date**
 */

const express = require("express");
require("express-async-errors");
const { auth } = require("../../middleware/auth");
const { media } = require("../../utils/storage");
const router = express.Router();
const {
  register,
  update,
  login,
  me,
  senOTP,
  passwordReset,
  deactivate,
  changePassword,
  fetchAll,
  fetch,
} = require("./controller");

router.get("/users", auth("users", "fetchAll"), fetchAll);

router.get("/users/:id", auth("users", "fetch"), fetch);

router.get("/users/me", auth("users", "me"), me);

router.post("/users", register);

router.put("/users", [auth("users", "update")], update);

router.post(
  "/users/change-password",
  [auth("users", "changePassword")],
  changePassword
);

router.post("/auth", login);

router.post("/auth/send-otp", senOTP);

router.post("/auth/password-reset", passwordReset);

router.post("/auth/deactivate", [auth("users", "deactivate")], deactivate);

module.exports.router = router;

//If true route will be accessable
module.exports.allow = true;
