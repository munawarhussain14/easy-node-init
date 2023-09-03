// Generate a 6-digit OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000);
}

// Set OTP expiry time in minutes (e.g., 5 minutes)
const otpExpiryMinutes = 5;

// Create an OTP object with the code and expiry timestamp
function createOTP() {
  const otpCode = generateOTP();
  const otpExpiry = new Date();
  otpExpiry.setMinutes(otpExpiry.getMinutes() + otpExpiryMinutes);
  return { otp_code: otpCode, otp_expiry: otpExpiry };
}

// Verify if the OTP is valid (not expired)
function verifyOTP(otp, enteredOTP) {
  const currentTimestamp = new Date();
  return otp.otp_code === enteredOTP && otp.otp_expiry > currentTimestamp;
}

// Example usage:
module.exports = { createOTP };
