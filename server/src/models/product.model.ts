import { Schema, Types, model, Document, PopulatedDoc, Model } from 'mongoose';
import slugify from 'slugify';
import { ICategoryDocument } from './category.model';
import { IUserDocument } from '@src/models/user.model';
import { ISubCategoryDocument } from './sub-category.model';
import { IVendorDocument } from './vendor.model';
import { IFileUpload } from '@src/types';

interface IUserRating {
  star: number;
  postedBy: PopulatedDoc<IUserDocument & Document>;
}

export interface IProduct {
  title: string;
  slug: string;
  description: string;
  price: number;
  category: PopulatedDoc<ICategoryDocument & Document>;
  subs: PopulatedDoc<ISubCategoryDocument>;
  quantity: number;
  sold: number;
  images: IFileUpload[];
  shipping: boolean;
  inStock: boolean;
  color: string[];
  brand: string;
  ratings: IUserRating[];
  vendor: PopulatedDoc<IVendorDocument & Document>;
  createdBy: PopulatedDoc<IUserDocument>;
  createdAt: string;
  updatedAt: string;
}

export interface IProductDocument extends IProduct, Document {}

export interface IProductModel extends Model<IProductDocument> {}

const schema = new Schema<IProductDocument, IProductModel>(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
      text: true,
    },
    slug: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
      text: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
      maxlength: 32,
    },
    category: { type: Types.ObjectId, ref: 'Category' },
    subs: [{ type: Types.ObjectId, ref: 'SubCategory' }],
    quantity: Number,
    sold: { type: Number, default: 0 },
    images: [{ public_id: String, id: String, url: String }],
    shipping: { type: Boolean, required: true, default: false },
    inStock: { type: Boolean, required: true, default: false },
    color: [
      {
        type: String,
        enum: ['Black', 'Brown', 'Silver', 'White', 'Blue'],
      },
    ],
    brand: {
      type: String,
      enum: ['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'ASUS'],
    },
    ratings: [
      { star: Number, postedBy: { type: Types.ObjectId, ref: 'User' } },
    ],
    vendor: { type: Types.ObjectId, ref: 'Vendor' },
    createdBy: { type: Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

schema.set('toJSON', {
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

schema.pre('validate', async function (next) {
  const product = this as IProductDocument;
  if (product.isModified('title') || product.isNew) {
    product.slug = slugify(product.title);
  }

  return next();
});

const Product = model<IProductDocument, IProductModel>('Product', schema);
export default Product;
