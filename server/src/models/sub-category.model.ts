import { Schema, model, Document, Types, PopulatedDoc } from 'mongoose';
import { ICategoryDocument } from '@src/models/category.model';
import { IUserDocument } from '@src/models/user.model';
import { IFileUpload } from '@src/types';

// Document interface
export interface ISubCategoryDocument extends Document {
  name: string;
  slug: string;
  category: PopulatedDoc<ICategoryDocument & Document>;
  isPublished: boolean;
  image: IFileUpload;
  createdBy: PopulatedDoc<IUserDocument & Document>;
  createdAt: Date;
  updatedAt: Date;
}

const schema = new Schema(
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
    image: { public_id: String, id: String, url: String },
    isPublished: { type: Boolean, required: true, default: false },
    category: { type: Types.ObjectId, ref: 'Category', required: true },
    createdBy: { type: Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

schema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    delete ret._id;
  },
});

export default model<ISubCategoryDocument>('SubCategory', schema);
