import { Request } from 'express';
import { IUserDocument } from '@src/models/user.model';

export interface IMulterAuthRequest extends Request {
  file: any;
  user: IUserDocument;
}
