import { NextFunction, Request, Response } from 'express';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import shortId from 'shortid';
import { sendPlainEmail } from '../services/email/nodemailer.services';
import AppError from '../errors/app.error';
import { IUserDocument } from '@src/models/user.model';
import { createAndSendTokenWithCookie } from '../utils/api.utils';
import * as awsService from '@src/services/aws/ses.services';
import { IJWTokenPayload } from '@src/interfaces/JsonWebToken';
import { User } from '@src/models';
import {
  AuthService,
  TokenService,
  UserService,
  VendorService,
} from '@src/services';
import { catchAsync } from '@src/utils/api.utils';

type SignupWithEmailVerificationBody = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};
type ForgotPasswordBody = { email: string };

// Request param types
type ResetPasswordParams = { token: string };

const signup = async (req: Request, res: Response) => {
  const { email, password, confirmPassword } = req.body;

  // Create new user account.
  const newUser = await UserService.create({
    email,
    password,
    confirmPassword,
  });

  // Generate token.
  // const token = generateToken({ id: newUser._id });

  return res.status(201).json({
    status: true,
    data: {
      user: newUser.toJSON(),
      // token,
    },
    message: 'created successfully',
  });
};

const vendorSignup = catchAsync(async (req: Request, res: Response) => {
  const { companyName, firstName, lastName, email, password, confirmPassword } =
    req.body;

  // Create new user account.
  const newUser = await UserService.create({
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
  });

  // Create new vendor.
  await VendorService.create({ name: companyName, users: [newUser.id] });

  // Generate token.
  // const token = generateToken({ id: newUser._id });

  return res.status(201).json({
    status: true,
    data: {
      user: newUser.toJSON(),
      // token,
    },
    message: 'created successfully',
  });
});

const customerSignup = async (req: Request, res: Response) => {
  const { email, password, confirmPassword } = req.body;

  // Create new user account.
  const newUser = await UserService.create({
    email,
    password,
    confirmPassword,
  });

  // Generate token.
  const token = TokenService.generate({ id: newUser._id });

  return res.status(201).json({
    status: true,
    data: {
      user: (newUser.toJSON(), ['password']),
      token,
    },
    message: 'created successfully',
  });
};

export const signupWithEmailVerification = async (
  req: Request,
  res: Response
): Promise<void | Response<any, Record<string, any>>> => {
  const { name, email, password }: SignupWithEmailVerificationBody = req.body;

  // Check if user exists
  // eslint-disable-next-line consistent-return
  const existingUser = await User.findOne({ email }).exec();
  if (existingUser) {
    return res.status(400).json({
      status: false,
      data: req.body,
      message: 'User is already taken',
    });
  }

  // Generate token with user's name, email and password
  const token = jwt.sign(
    { name, email, password },
    process.env.JWT_ACCOUNT_ACTIVATION as string,
    {
      expiresIn: +(process.env.JWT_ACCOUNT_ACTIVATION_EXPIRES_IN as string),
    }
  );

  // Send email verification message
  return awsService
    .sendAccountActivationMail(email, token)
    .then(data => {
      console.log('Email submitted to SES', data);
      res.send({
        status: true,
        message: `Email has been sent to ${email}. Follow the instructions to complete your registration`,
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500).send({
        status: false,
        message: 'We could not verify your email, please try again',
      });
    });
};

export const activateAccount = async (req: Request, res: Response) => {
  const { token } = req.body;

  // Check that activation token has not expired
  const decodedToken = jwt.verify(
    token,
    process.env.JWT_ACCOUNT_ACTIVATION as string
  );
  if (!decodedToken) {
    return res
      .status(401)
      .send({ status: false, message: 'Expired link: Try again' });
  }

  const { name, email, password, categories } = decodedToken as IJWTokenPayload;

  // Check if email already exists
  const existingUser = await User.findOne({ email }).exec();

  if (existingUser) {
    return res
      .status(400)
      .json({ status: false, data: req.body, message: 'Email is taken' });
  }

  // Generate username
  const username = shortId.generate();
  const newUser = new User({
    name,
    username,
    email,
    password,
    categories,
  });
  newUser.save();

  return res.status(201).json({
    status: true,
    data: newUser,
    message: 'Registration successful, please login',
  });
};

const signIn = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const existingUser = await AuthService.signIn(email, password);

    // Generate user token.
    const tokens = await TokenService.generateTokens({ id: existingUser._id});

    // Success response.
    res.json({
      status: true,
      data: { user: existingUser, tokens },
      message: 'Sign in successful',
    });

    // return createAndSendTokenWithCookie(
    //   existingUser,
    //   200,
    //   req,
    //   res,
    //   'Login successful'
    // );
  }
);

const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body as ForgotPasswordBody;
  // Validate user email
  const existingUser: IUserDocument | null = await User.findOne({ email });
  if (!existingUser)
    return next(new AppError('User with email address does not exist', 401));

  // Generate reset password token
  const passwordResetToken = existingUser.createPasswordResetToken();
  await existingUser.save({ validateBeforeSave: false }); // At this point you are setting password reset token and saving
  // The save method will run validations on inputs and will fail due to the lack of for example confirm password etc
  // set validateBeforeSave: false for this particular operation as we do not need confirm password validation here

  // Send to user as an email
  const resetPasswordUrl = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/auth/resetPassword/${passwordResetToken}`;
  const message = `Forgot your password, submit a request with your new password and password confirm
        to: ${resetPasswordUrl}.\nIf you didn't forget your password, please ignore this email
    `;
  const subject = 'Reset your password(valid for 10mins)';

  try {
    await sendPlainEmail({ email: existingUser.email, subject, message });

    return res.json({
      status: true,
      message: 'Password reset has been sent to email',
    });
  } catch (error: any) {
    existingUser.passwordResetToken = undefined;
    existingUser.passwordResetExpiresIn = undefined;
    existingUser.save();
    // await existingUser.save({ validateBeforeSave: false })
    return next(
      new AppError(
        'Cannot send password reset email at the moment, please try again later',
        500
      )
    );
  }
};

const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const params = req.params as ResetPasswordParams;
  // Hash unhashed password reset token
  const currentHashedToken = crypto
    .createHash('sha256')
    .update(params.token)
    .digest('hex');

  // Find a user with this hashed token
  const existingUser = await User.findOne({
    passwordResetToken: currentHashedToken,
    passwordResetExpiresIn: { $gt: Date.now() },
  });
  if (!existingUser)
    return next(new AppError('Token is either invalid or has expired', 400));

  existingUser.password = req.body.password;
  existingUser.confirmPassword = req.body.confirmPassword;
  existingUser.passwordResetToken = undefined;
  existingUser.passwordResetExpiresIn = undefined;
  await existingUser.save();

  // Generate token
  const token = TokenService.generate({ id: existingUser._id });

  return res.json({
    status: true,
    data: token,
    message: 'Password reset successful',
  });
};

const logoutCookie = async (req: Request, res: Response) => {
  res.cookie('token', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.json({ status: true, message: 'Logout successful' });
};

const changePassword = async (req: Request, res: Response) => {
  res.json({ status: true, message: 'Logout successful' });
};

const getCurrentUser = async (req: Request, res: Response): Promise<void> => {
  console.log('getCurrentUser');
  const existingUser = await User.findOne({ email: req.user!.email }).exec();
  res.json(existingUser);
};

export {
  signIn,
  signup,
  vendorSignup,
  customerSignup,
  forgotPassword,
  resetPassword,
  changePassword,
  logoutCookie,
  getCurrentUser,
};
