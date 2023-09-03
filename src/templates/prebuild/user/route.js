/**
 * Create By: easy-node-init
 * Create Date: **create_date**
 */

const express = require("express");
const auth = require("../../middleware/auth");
const router = express.Router();
const {
  register,
  update,
  login,
  me,
  senOTP,
  passwordReset,
  deactivate,
} = require("./controller");

router.get("/users/me", auth, me);

router.post("/users", register);

router.post("/users/update", [auth], update);

router.post("/auth", login);

router.post("/auth/send-otp", senOTP);

router.post("/auth/password-reset", passwordReset);

router.post("/auth/deactivate", [auth], deactivate);

module.exports.router = router;

//If true route will be accessable
module.exports.allow = true;
