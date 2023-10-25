import { IUserDocument } from "@src/models/user.model";
import { TokenService } from "@src/services";
import { Request, Response, NextFunction } from "express";



export enum httpStatus {
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
}

export class ApiResponse<T> {
  status: boolean;
  message: string;
  data: T | undefined;

  constructor(message: string, data?: T, status = true) {
    this.status = status;
    this.message = message;
    this.data = data;
  }
}

export const catchAsync = (
  callback: (req: Request, res: Response, next: NextFunction) => any
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    callback(req, res, next).catch(next);
  };
};

export class APIQuery {
  query: any;

  queryString: any;

  constructor(query: any, queryString: any) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(field => delete queryObj[field]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);
    const filterQuery = JSON.parse(queryStr);

    this.query.find(filterQuery);

    return this;
  }

  // SORTING
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.replace(',', ' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  // FIELD LIMITING
  limitFields() {
    if (this.queryString.fields) {
      const selectFields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(selectFields);
    } else {
      this.query = this.query.select('-__v');
    }

    return this;
  }

  // PAGINATION
  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 10;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

export const createAndSendToken = (
  user: IUserDocument,
  statusCode: number,
  res: Response
): void => {
  const token = TokenService.generate({ id: user._id });

  res.status(statusCode).json({
    status: true,
    data: {
      loggedInUser: { id: user._id, email: user.email, name: user.fullName },
      token,
    },
    message: 'Login successful',
  });
};

export const createAndSendTokenWithCookie = (
  user: IUserDocument,
  statusCode: number,
  req: Request,
  res: Response,
  message: string
): void => {
  const token = TokenService.generate({ id: user._id });
  const expiresIn: any = process.env.JWT_AUTH_COOKIE_EXPIRES_IN;
  const cookieOptions = {
    expires: new Date(Date.now() + expiresIn * 24 * 60 * 60 * 1000),
    httpOnly: true,
    // secure: req.secure || req.headers['x-forwarded-proto'] === 'https', // This is heroku specific
  };

  // if(process.env.NODE_ENV === 'production') {
  //     cookieOptions.secure = true
  // }

  // console.log(112, user);

  res.cookie('token', token, cookieOptions);

  const retrievedUser = { ...user.toJSON(), password: undefined };
  res
    .status(statusCode)
    .json({ status: true, data: { user: retrievedUser, token }, message });
};
