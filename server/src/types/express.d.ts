import { IUserDocument } from '@src/models/user.model';
import { IVendorDocument } from '@src/models/vendor.model';

declare global {
  namespace Express {
    interface Request {
      user: IUserDocument | (IUserDocument & { vendor: string });
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
