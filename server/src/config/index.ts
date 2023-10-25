import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import path from 'path';
import Joi from 'joi';

const env = dotenv.config({ path: path.join(process.cwd(), '.env') });
dotenvExpand.expand(env);

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid('production', 'development', 'test')
      .required(),
    PORT: Joi.number().default(3000),
    API_VERSION: Joi.string().required().description('API version'),
    CLIENT_BASE_URL: Joi.string().required().description('Client base URL'),

    API_BASE_URL: Joi.string().required().description('API base URL'),
    DATABASE_URI: Joi.string().required().description('Database URI'),
    ADMIN_USERNAME: Joi.string().required().description('Default Admin User'),
    ADMIN_PASSWORD: Joi.string()
      .required()
      .description('Default Admin Password'),
    JWT_AUTH_SECRET: Joi.string().required().description('JWT auth secret key'),
    JWT_AUTH_ACCESS_EXPIRES_IN: Joi.number()
      .default(30)
      .description('time after which access tokens expire'),
    JWT_AUTH_REFRESH_EXPIRES_IN: Joi.number()
      .default(30)
      .description('time after which refresh tokens expire'),
    JWT_RESET_PASSWORD_SECRET: Joi.string()
      .required()
      .description('JWT reset password secret key'),
    JWT_RESET_PASSWORD_EXPIRES_IN: Joi.number()
      .default(10)
      .description('time after which reset password token expires'),
    JWT_VERIFY_EMAIL_EXPIRES_IN: Joi.number()
      .default(10)
      .description('time after which verify email token expires'),
    REDIS_HOST: Joi.string().required().description('Redis host server'),

    SMTP_HOST: Joi.string().description('server that will send the emails'),
    SMTP_PORT: Joi.number().description('port to connect to the email server'),
    SMTP_USERNAME: Joi.string().description('username for email server'),
    SMTP_PASSWORD: Joi.string().description('password for email server'),
    EMAIL_FROM: Joi.string()
      .email()
      .description('the from field in the emails sent by the app'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export default {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  jwt: {
    authSecret: envVars.JWT_AUTH_SECRET,
    authAccessExpiresIn: envVars.JWT_AUTH_ACCESS_EXPIRES_IN,
    authRefreshExpiresIn: envVars.JWT_AUTH_REFRESH_EXPIRES_IN,
    resetPassword: envVars.JWT_RESET_PASSWORD_SECRET,
    resetPasswordExpiresIn: envVars.JWT_RESET_PASSWORD_EXPIRES_IN,
    verifyEmailExpiresIn: envVars.JWT_VERIFY_EMAIL_EXPIRES_IN,
  },
  email: {
    smtp: {
      host: envVars.SMTP_HOST,
      port: envVars.SMTP_PORT,
      auth: {
        user: envVars.SMTP_USERNAME,
        pass: envVars.SMTP_PASSWORD,
      },
    },
    from: envVars.EMAIL_FROM,
  },
  redisHost: envVars.REDIS_HOST,
  clientBaseUrl: envVars.CLIENT_BASE_URL,
  api: {
    baseUrl: envVars.API_BASE_URL,
    version: envVars.API_VERSION,
    baseEndpoint: `/api/${envVars.API_VERSION}`,
  },
  dbUri: envVars.DATABASE_URI,
  admin: {
    username: envVars.ADMIN_USERNAME,
    password: envVars.ADMIN_PASSWORD,
  },
};
