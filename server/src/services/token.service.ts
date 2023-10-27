import { UserService } from '@src/services';
import jwt from 'jsonwebtoken';
import config from '@src/config';
import ApiError from '@src/errors/api-error';
import { httpStatus } from '@src/utils/api.utils';
import Token, { TokenType } from '@src/models/token';
import moment from 'moment';
import { IUserDocument } from '@src/models/user.model';

const generateAuthTokens = async (user: IUserDocument) => {
  const accessExpiry = 60;
  const accessTokenExpires = moment().add(accessExpiry, 'minutes');
  const accessToken = Token.generate(
    user._id,
    TokenType.ACCESS,
    accessTokenExpires
  );

  const refreshExpiry = 1;
  const refreshTokenExpires = moment().add(refreshExpiry, 'days');

  const refreshToken = await Token.build(
    user._id,
    TokenType.REFRESH,
    refreshTokenExpires
  );
  //   await saveToken(
  //     refreshToken,
  //     user.id,
  //     refreshTokenExpires,
  //     TokenType.REFRESH
  //   );

  return {
    access: {
      token: accessToken,
      expiresIn: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expiresIn: refreshTokenExpires.toDate(),
    },
  };
};

/**
 * Generate reset password token
 * @param {string} email
 * @returns {Promise<string>}
 */
const generateResetPasswordToken = async (email: string): Promise<string> => {
  const user = await UserService.getUserByEmail(email);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No users found with this email');
  }
  const expiresAt = moment().add(60, 'minutes');
  const token = await Token.build(
    user._id,
    TokenType.RESET_PASSWORD,
    expiresAt
  );

  return token;
};

export const generate = (payload: string | any | Buffer) =>
  jwt.sign(payload, config.jwt.authSecret, {
    expiresIn: config.jwt.authAccessExpiresIn,
  });

const generateTokens = async (payload: string | any | Buffer) => {
  const accessExpiresIn = config.jwt.authAccessExpiresIn;
  const accessTokenExpires = moment().add(accessExpiresIn, 'seconds');
  const accessToken = jwt.sign(payload, config.jwt.authSecret, {
    expiresIn: accessExpiresIn,
  });

  const refreshExpiresIn = config.jwt.authAccessExpiresIn;
  const refreshTokenExpires = moment().add(refreshExpiresIn, 'seconds');

  const refreshToken = jwt.sign(payload, config.jwt.authSecret, {
    expiresIn: refreshExpiresIn,
  });

  return {
    access: {
      token: accessToken,
      expiresIn: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expiresIn: refreshTokenExpires.toDate(),
    },
  };
};

export const verify = (token: string) =>
  jwt.verify(token, config.jwt.authSecret);

export default {
  generateTokens,
  generateAuthTokens,
  generateResetPasswordToken,
  generate,
  verify,
};
