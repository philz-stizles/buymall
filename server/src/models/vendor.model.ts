import { Model, Schema, model, Document, Types } from 'mongoose';
import { IUser } from './user.model';

interface IUpload {
  url: string;
  uploadId: string;
  main: boolean;
}

export interface IVendor {
  name: string;
  bio?: string;
  logo?: any;
  locations?: string[];
  images?: IUpload[];
  users: Types.ObjectId[];
  products: Types.ObjectId[];
  coupons: Types.ObjectId[];
  createdBy: IUser;
  createdAt: Date;
  updatedAt: Date;
}

export interface IVendorDocument extends IVendor, Document {}

export interface IVendorModel extends Model<IVendorDocument> {}

// Put as much logic in the models to keep the controllers as simple and lean as possible
const schema = new Schema<IVendorDocument, IVendorModel>(
  {
    name: {
      type: String,
      required: [true, 'A user must have a name'],
      trim: true,
      unique: true,
    },
    bio: {
      type: String,
      trim: true,
    },
    logo: { type: Buffer },
    locations: [String],
    images: [
      {
        url: String,
        uploadId: String,
      },
    ],
    users: [{ type: Types.ObjectId, ref: 'User' }],
    products: [{ type: Types.ObjectId, ref: 'Product' }],
    coupons: [{ type: Types.ObjectId, ref: 'Coupon' }],
    createdBy: { type: Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

const Vendor = model<IVendorDocument, IVendorModel>('Vendor', schema);

export default Vendor;
