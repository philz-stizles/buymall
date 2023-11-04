import { Request, Response, NextFunction } from 'express';
import admin from './';
import { User } from '@src/models';
import { catchAsync } from '@src/utils/api.utils';

export const authCheck = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const firebaseUser = await admin
      .auth()
      .verifyIdToken(req.headers.authtoken as string);
    console.log("FIREBASE USER IN AUTH CHECK", firebaseUser);
    req.user = firebaseUser;
    next();
  }
);

export const adminCheck = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.user;

  const adminUser = await User.findOne({ email }).exec();

  if (!adminUser || adminUser.role !== 'admin') {
    return res.status(403).json({
      err: 'Admin resource. Access denied.',
    });
  } else {
    next();
  }
};
