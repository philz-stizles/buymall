import { Schema, model } from 'mongoose';

export interface IDataDocument {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  ipAddress: string;
}

const schema = new Schema<IDataDocument>(
  {
    firstName: {
      type: String,
      trim: true,
      required: [true, 'Name is required'],
      minlength: [2, 'Too short'],
      maxlength: [32, 'Too long'],
    },
    lastName: {
      type: String,
      trim: true,
      required: [true, 'Name is required'],
      minlength: [2, 'Too short'],
      maxlength: [32, 'Too long'],
    },
    email: {
      type: String,
      trim: true,
      required: [true, 'Email is required'],
    },
    gender: {
      type: String,
    },
    ipAddress: {
      type: String,
    },
  },
  { timestamps: true }
);

export default model<IDataDocument>('Data', schema);
