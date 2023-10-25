import { Schema, model, Document } from 'mongoose';

export interface ILogDocument extends Document {
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

const logSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: 'Name is required',
      minlength: [2, 'Too short'],
      maxlength: [32, 'Too long'],
    },
    slug: { type: String, unique: true, lowercase: true, index: true },
  },
  { timestamps: true }
);

const Log = model<ILogDocument>('Log', logSchema);

export default Log;
