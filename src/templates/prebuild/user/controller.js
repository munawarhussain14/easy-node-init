/**
 * Create By: easy-node-init
 * Create Date: **create_date**
 */
const _ = require("lodash");
const flowDebugger = require("debug")("app:flow");

const bcrypt = require("bcrypt");
const {
  User,
  validate,
  validateAuth,
  validateResetPasswordReqeust,
  validateUserUpdate,
  validateOTP,
  validatePassword,
} = require("./model");
const hashPassword = require("../../utils/hashPassword");
const { createOTP } = require("../../utils/otp");

// GET: => api/v1/users/me
exports.me = async (req, res) => {
  let document = await User.findById(req.user._id);

  if (!document)
    return res.status(404).send({ message: "Document with id not found" });

  return res.send({
    success: true,
    data: document,
  });
};

// PUT: => api/v1/users
exports.update = async (req, res) => {
  const { error } = validateUserUpdate(req.body);

  if (error) return res.status(400).send({ message: error.details[0].message });

  let document = await User.findById(req.user._id);

  if (!document)
    return res.status(404).send({ message: "Document with id not found" });

  user.first_name = req.body.first_name;

  user.last_name = req.body.last_name;

  await user.save();

  document = await User.findById(req.user._id);

  return res.send({
    success: true,
    data: document,
    message: "Updated!",
  });
};

// POST: => api/v1/register
exports.register = async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send({ message: error.details[0].message });

  let user = await User.findOne({ email: req.body.email });

  if (user && user.active)
    return res
      .status(400)
      .send({ success: false, message: "User already registered" });
  else if (user && !user.active) {
    user.first_name = req.body.first_name;
    user.last_name = req.body.last_name;
    user.verificaiton = { email: false, phone: false };
    user.password = await hashPassword(req.body.password);
  } else {
    user = new User(
      _.pick(req.body, ["first_name", "last_name", "email", "password"])
    );
    user.verificaiton = { email: false, phone: false };
    user.password = await hashPassword(user.password);
  }

  const result = await user.save();
  const token = user.generateAuthToken();

  return res.header("x-auth-token", token).send({
    success: true,
    message: "User registred",
    data: _.pick(result, ["_id", "first_name", "last_name", "email"]),
  });
};

// POST: => api/v1/users
exports.login = async (req, res) => {
  const { error } = validateAuth(req.body);

  if (error) return res.status(400).send({ message: error.details[0].message });

  let user = await User.findOne({ email: req.body.email }).select("+password");

  if (!user || (user && !user.active))
    return res.status(400).send({ message: "Invalid email or password" });

  const validPassword = await bcrypt.compare(req.body.password, user.password);

  if (!validPassword)
    return res.status(400).send({ message: "Invalid email or password" });

  const token = user.generateAuthToken();

  res.send({ success: true, token, message: "Login Successfully" });
};

// POST: => api/v1/send-otp
exports.senOTP = async (req, res) => {
  const { error } = validateResetPasswordReqeust(req.body);

  if (error) return res.status(400).send({ message: error.details[0].message });

  let user = await User.findOne({ email: req.body.email });

  if (!user) return res.send({ message: "Invalid email or OTP" });

  let otp = createOTP();

  // TODO: Implement your OTP sending to code

  user.otp = otp;

  await user.save();

  res.send({ success: true, message: "OTP Send to you email" });
};

exports.passwordReset = async (req, res) => {
  const { error } = validateOTP(req.body);

  if (error) return res.status(400).send({ message: error.details[0].message });

  let user = await User.findOne({ email: req.body.email }).select(
    "+otp.otp_code +otp.otp_expiry"
  );

  flowDebugger("Check if valid OTP setting exist");

  if (!user || !user.otp || !user.otp.otp_code || !user.otp.otp_expiry)
    return res.status(400).send({ message: "Invalid email or OTP" });

  let otp = req.body.otp;

  flowDebugger("Check if valid OTP match");

  const currentTimestamp = new Date();

  if (user.otp.otp_code !== otp || currentTimestamp > user.otp.otp_expiry) {
    return res.status(400).send({ message: "Invalid email or OTP" });
  }

  user.password = await hashPassword(req.body.password);

  user.otp = null;

  await user.save();

  res.send({ success: true, message: "Password reset Successfully" });
};


exports.changePassword = async (req, res) => {

  const { error } = validatePassword(req.body);

  if (error) return res.status(400).send({ message: error.details[0].message });

  let user = await User.findById(req.user._id);

  flowDebugger("Change Password");

  user.password = await hashPassword(req.body.password);

  await user.save();

  res.send({ success: true, message: "Password change Successfully" });
};

exports.deactivate = async (req, res) => {
  const { error } = validateOTP(req.body);

  if (error) return res.status(400).send({ message: error.details[0].message });

  let user = await User.findOne({ email: req.body.email }).select(
    "+otp.otp_code +otp.otp_expiry +password"
  );

  flowDebugger("Check if valid OTP setting exist");

  if (!user || !user.otp || !user.otp.otp_code || !user.otp.otp_expiry)
    return res.status(400).send({ message: "Invalid email or OTP" });

  let otp = req.body.otp;

  flowDebugger("Check if valid OTP match");

  const currentTimestamp = new Date();

  if (user.otp.otp_code !== otp || currentTimestamp > user.otp.otp_expiry) {
    return res.status(400).send({ message: "Invalid email or OTP" });
  }

  flowDebugger("Check if Password");
  const validPassword = await bcrypt.compare(req.body.password, user.password);

  if (!validPassword)
    return res.status(400).send({ message: "Invalid email or password" });

  flowDebugger("Deactivate Acount");
  user.active = false;
  user.otp = null;
  await user.save();

  res.send({ success: true, otp, message: "Account deactivated" });
};
