import { Schema, model, Types, Document, PopulatedDoc, Model } from 'mongoose';
import { IUserDocument } from './user.model';
import { IVendorDocument } from './vendor.model';

export interface ICoupon {
  name: string;
  expiry: Date;
  discount: number;
  isActive?: boolean;
  createdBy?: PopulatedDoc<IUserDocument & Document>;
  vendor: PopulatedDoc<IVendorDocument & Document>;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICouponDocument extends ICoupon, Document {}

export interface ICouponModel extends Model<ICouponDocument> {
}

const schema = new Schema<ICouponDocument, ICouponModel>(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      uppercase: true,
      required: [true, 'Name is required'],
      minlength: [6, 'Too short'],
      maxlength: [12, 'Too long'],
    },
    expiry: { type: Date, required: true },
    discount: { type: Number, required: true },
    isActive: { type: Boolean, required: true, default: false },
    vendor: { type: Types.ObjectId, ref: 'Vendor' },
    createdBy: { type: Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

const Coupon = model<ICouponDocument, ICouponModel>('Coupon', schema);
export default Coupon;
