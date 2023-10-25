import express from 'express';
import {
  signup,
  signupWithEmailVerification,
  activateAccount,
  forgotPassword,
  resetPassword,
  changePassword,
  logoutCookie,
  getCurrentUser,
  vendorSignup,
  customerSignup,
  signIn,
} from '@src/controllers/auth.controllers';
import userRoutes from './user.routes';
import { authenticate } from '@src/middlewares/auth.middlewares';
import { validator } from '@src/middlewares';
import { authValidation } from '@src/validations';

const router = express.Router();

router.post('/signup', validator(authValidation.signUp), signup);
router.post('/vendor-signup', validator(authValidation.signUpVendor), vendorSignup);
router.post('/customer-signup', customerSignup);

router.post(
  '/signup-with-email-verification',
  validator(authValidation.signUp),
  signupWithEmailVerification
);
router.post('/activate-account', activateAccount);
router.post('/signin', validator(authValidation.signIn), signIn);

router.use('/current-user', authenticate, getCurrentUser);

router.post('/forgot-password', forgotPassword);
router.patch('/reset-password/:token', resetPassword);
router.patch('/change-password', changePassword);
router.get('/logout', logoutCookie);

export default router;
