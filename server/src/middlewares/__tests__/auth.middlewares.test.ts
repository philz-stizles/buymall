/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Response } from 'express';
import { authenticate } from '../auth.middlewares';
// import catchAsync from '../../utils/catchAsync';

let mockReq: any;
let mockRes: Response;
let mockNext: NextFunction; //

beforeAll(() => {
  mockReq = {
    get() {
      return null;
    },
  };
  mockRes = {} as Response;
  mockNext = () => {};
});

beforeEach(() => {});

describe('Authentication middleware', () => {
  describe('Authenticate', () => {
    it('should throw an error if no authorization header is present', async () => {
      expect(authenticate(mockReq, mockRes, mockNext)).toThrowError(
        'You are not logged in. Please log'
      );
    });
  });

  describe('Authorize', () => {});
});
