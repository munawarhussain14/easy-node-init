const bcrypt = require("bcrypt");
const startupDebugger = require("debug")("app:startup");

module.exports = async function (password) {
  const salt = await bcrypt.genSalt(10);
  hashPassword = await bcrypt.hash(password, salt);
  startupDebugger("Hash Password....");
  return hashPassword;
};
