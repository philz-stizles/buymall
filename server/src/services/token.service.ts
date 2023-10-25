import jwt from 'jsonwebtoken';
import config from '@src/config';

export const generate = (payload: string | any | Buffer) =>
  jwt.sign(payload, config.jwt.authSecret, {
    expiresIn: config.jwt.authAccessExpiresIn,
  });

export const verify = (token: string) =>
  jwt.verify(token, config.jwt.authSecret);

export default {
  generate,
  verify,
};
