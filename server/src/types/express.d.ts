import { IUserDocument } from '@src/models/user.model';
import { IVendorDocument } from '@src/models/vendor.model';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

declare global {
  namespace Express {
    interface Request {
      user: IUserDocument | DecodedIdToken;
      vendor?: IVendorDocument | null;
      file: any;
    }
  }
}

declare global {
  namespace NodeJS {
    interface Global {
      __basedir: string;
    }
  }
}

export {};
