import ApiError from '@src/errors/api-error';
import { IUserDocument } from '@src/models/user.model';
import { OtpService, UserService } from '@src/services';
import { httpStatus } from '@src/utils/api.utils';
import { exclude } from '@src/utils/object.utils';

// export interface Credentials {
//   name: string;
//   email: string;
//   password: string;
// }

/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<Omit<IUserDocument, 'password'>>}
 */
const signIn = async (
  email: string,
  password: string
): Promise<Omit<IUserDocument, 'password'>> => {
  const existingUser = await UserService.getUserByEmail(email, [
    'id',
    'email',
    'name',
    'password',
    'role',
    'isEmailVerified',
    'createdAt',
    'updatedAt',
  ]);
  if (!existingUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid user credentials');
  }

  // Validate password.
  if (!(await existingUser.comparePassword(password))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid user credentials');
  }
  return exclude(existingUser, ['password']);
};

const verifyEmailWithToken = async (refresh: string) => {};

const verifyOtp = async ({ email, code }: { email: string; code: string }) => {
  const isValid = await OtpService.verifyOtp({email, code});
  if (!isValid) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid OTP');
  }

  await UserService.updateUserByEmail(email, { isEmailVerified: true });
};

const refreshToken = async (refresh: string) => {};

const forgotPassword = async (email: string) => {};

const resetPassword = async (token: string, password: string) => {};

const signOut = async (refreshToken: string) => {};

export default {
  signIn,
  verifyOtp,
  verifyEmailWithToken,
  refreshToken,
  forgotPassword,
  resetPassword,
  signOut,
};
