import { Schema, model, Types, Document, PopulatedDoc, Model } from 'mongoose';
import { IUserDocument } from '@src/models/user.model';
import { IFileUpload } from '@src/types';

export interface ICategory extends Document {
  name: string;
  slug: string;
  description?: string;
  createdBy: PopulatedDoc<IUserDocument & Document>;
  image: IFileUpload;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICategoryDocument extends Document, ICategory {}

export interface ICategoryModel extends Model<ICategoryDocument> {}

const schema = new Schema<ICategoryDocument, ICategoryModel>(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Name is required'],
      minlength: [2, 'Too short'],
      maxlength: [32, 'Too long'],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      minlength: [2, 'Too short'],
      maxlength: [100, 'Too long'],
    },
    image: { public_id: String, id: String, url: String },
    isPublished: { type: Boolean, required: true, default: false },
    createdBy: { type: Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

// schema.index({ name: 'text', description: 'text' });

schema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    delete ret._id;
  },
});

export default model<ICategoryDocument, ICategoryModel>('Category', schema);
