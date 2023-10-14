const axios = require("axios");
require("dotenv").config();

const sendEmail = async (options) => {
  var data = new URLSearchParams();
  data.append("email", options.email);
  data.append("subject", options.subject);
  data.append("body", options.message);

  return await axios.post(
    `${process.env.EMAIL_URL}syb-api/email/email.php`,
    data
  );
};

module.exports = sendEmail;
