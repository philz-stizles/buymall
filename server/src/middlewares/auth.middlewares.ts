import { Response, NextFunction, Request } from 'express';
import User, { IUserDocument } from '../models/user.model';
import AppError from '../errors/app.error';
import { IJWTokenPayload } from '@src/interfaces/JsonWebToken';
import { catchAsync } from '@src/utils/api.utils';
import { TokenService } from '@src/services';
import { IRole, IRoleDocument } from '@src/models/role.model';
import { Vendor } from '@src/models';

export const authenticate = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // Check if there is a token
    let token = '';
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      // console.log('HEADERS', req.headers);
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.token) {
      // eslint-disable-next-line prefer-destructuring
      token = req.cookies.token;
    }

    // console.log('AUTHENTICATE', token);

    if (!token) throw new AppError('You are not logged in. Please log', 401);

    // Check if token is valid
    const decodedToken = TokenService.verify(token) as IJWTokenPayload;
    if (!decodedToken)
      return next(new AppError('You are not authorized. Please log', 401));
    // console.log('TOKEN', decodedToken);
    // Check if user exists(or if a previously existing user with a valid token has been deleted)
    // and return user if true
    const existingUser = (await User.findById(decodedToken.id).populate(
      'roles'
    )) as IUserDocument;
    if (!existingUser)
      return next(
        new AppError('You no longer have access to this resource', 401)
      );

    // Check if user changed password after JWT was created passing the issued at(iat) value
    const passwordChangedAfterTokenGen =
      existingUser.isPasswordChangedAfterTokenGen(decodedToken.iat);
    if (passwordChangedAfterTokenGen) {
      return next(
        new AppError(
          'User recently changed their password! Please log in again.',
          401
        )
      );
    }

    // Grant access to protected route
    req.user = existingUser;

    return next();
  }
);

export const authorize = (
  ...authorizedUsers: string[]
): // eslint-disable-next-line no-unused-vars
((req: Request, res: Response, next: NextFunction) => void) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { roles, id } = req.user;
    if (
      roles.some((role: IRole) =>
        authorizedUsers.includes(role.name.toLowerCase())
      )
    ) {
      if (roles.some((role: IRole) => role.name === 'VENDOR')) {
        const existingVendor = await Vendor.findOne({
          users: id,
        });
        if (existingVendor) {
          req.vendor = existingVendor;
        }
      }

      return next();
    }

    return next(
      new AppError('You do not have the permission to perform this action', 403)
    );
  });
