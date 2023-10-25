import config from '@src/config';
import Otp, { OtpType } from '@src/models/otp';
import moment from 'moment';

/**
 * Generate verify email token
 * @param {string} email
 * @returns {Promise<string>}
 */
const generateOtp = async (email: string): Promise<string> => {
  const expiresAt = moment().add(
    config.jwt.verifyEmailExpiresIn,
    'minutes'
  );

  return await Otp.build(email, OtpType.VERIFY_EMAIL, expiresAt);
};

/**
 * Verify OTP
 * @param {string} email
 * @returns {Promise<string>}
 */
const verifyOtp = async ({ email, code}: {
  email: string;
  code: string;
}): Promise<boolean> => {
  const existingOtp = await Otp.findOne({ userId: email, code });
  return existingOtp === null ? false : true;
};

export default {
  generateOtp,
  verifyOtp,
};
