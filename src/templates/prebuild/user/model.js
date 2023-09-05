/**
 * Create By: easy-node-init
 * Create Date: **create_date**
 */
const config = require("config");
const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const otpSchema = new mongoose.Schema({
  otp_code: {
    type: String,
    minlength: [6, "Your OTP must be longer than 6 characters"],
    select: false,
  },
  otp_expiry: {
    type: Date,
    select: false,
  },
});

const verificationSchema = new mongoose.Schema({
  email: {
    type: Boolean,
    default: false,
  },
  phone: {
    type: Boolean,
    default: false,
    select: false,
  },
});

const User = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
    max: 20,
  },
  last_name: {
    type: String,
    max: 20,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: [true, "Please enter your Password"],
    minlength: [6, "Your password must be longer than 6 characters"],
    select: false,
  },
  otp: otpSchema,
  isAdmin: Boolean,
  active: {
    type: Boolean,
    default: true,
  },
  block: {
    type: Boolean,
    default: false,
  },
  verificaiton: verificationSchema,
});

User.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    config.get("jwtPrivateKey")
  );
  return token;
};

function validateUser(user) {
  const schema = Joi.object({
    first_name: Joi.string().required().max(20),
    last_name: Joi.string(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    otp_code: Joi.string().min(6),
  });

  return schema.validate(user);
}

function validateUserUpdate(user) {
  const schema = Joi.object({
    first_name: Joi.string().required().max(20),
    last_name: Joi.string(),
  });

  return schema.validate(user);
}

function validateAuth(user) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(user);
}

function validateResetPasswordReqeust(user) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
  });

  return schema.validate(user);
}

function validateOTP(user) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    otp: Joi.string().min(6),
  });

  return schema.validate(user);
}

function validatePassword(user) {
  const schema = Joi.object({
    password: Joi.string().min(6).required(),
  });

  return schema.validate(user);
}

exports.validateAuth = validateAuth;
exports.validate = validateUser;
exports.validateResetPasswordReqeust = validateResetPasswordReqeust;
exports.validateUserUpdate = validateUserUpdate;
exports.validateOTP = validateOTP;
exports.validatePassword = validatePassword;
exports.User = mongoose.model("User", User);
