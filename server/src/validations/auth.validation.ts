import Joi from 'joi';

const strongPassword: Joi.CustomValidator<string> = (value, helpers) => {
  if (value.length < 8) {
    return helpers.error('password must be at least 8 characters');
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.error(
      'password must contain at least 1 letter and 1 number'
    );
  }
  return value;
};

const signUp = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(strongPassword),
  }),
};
const signUpVendor = {
  body: Joi.object().keys({
    companyName: Joi.string().required(),
    email: Joi.string().required().email(),
    firstName: Joi.string(),
    lastName: Joi.string(),
    password: Joi.string().required().custom(strongPassword),
    confirmPassword: Joi.string().required(),
  }),
};

const signUpCustomer = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(strongPassword),
  }),
};

const signIn = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

const signOut = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
};

const resetPassword = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
  body: Joi.object().keys({
    password: Joi.string().required().custom(strongPassword),
  }),
};

const verifyToken = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
};

const verifyOtp = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    code: Joi.string().required(),
  }),
};

export default {
  signUp,
  signUpVendor,
  signUpCustomer,
  signIn,
  signOut,
  refreshTokens,
  forgotPassword,
  resetPassword,
  verifyToken,
  verifyOtp,
};
