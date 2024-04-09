export function isSixDigitOTP(otp) {
  // Use a regular expression to check if the OTP is exactly six digits.
  // The regular expression /^\d{6}$/ matches a string that consists of exactly six digits.
  return /^\d{6}$/.test(otp);
}
