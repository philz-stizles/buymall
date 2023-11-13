import { Schema, model, Types, Document, PopulatedDoc, Model } from 'mongoose';
import { IUserDocument } from '@src/models/user.model';

export interface IColor extends Document {
  name: string;
  description?: string;
  createdBy: PopulatedDoc<IUserDocument & Document>;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IColorDocument extends Document, IColor {}

export interface IColorModel extends Model<IColorDocument> {}

const schema = new Schema<IColorDocument, IColorModel>(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Name is required'],
      minlength: [2, 'Too short'],
      maxlength: [32, 'Too long'],
    },
    description: {
      type: String,
      trim: true,
      minlength: [2, 'Too short'],
      maxlength: [100, 'Too long'],
    },
    isPublished: { type: Boolean, required: true, default: false },
    createdBy: { type: Types.ObjectId, ref: 'User', required: true },
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

export default model<IColorDocument, IColorModel>('Color', schema);
