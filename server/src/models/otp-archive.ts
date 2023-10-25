import { Model, Schema, model } from 'mongoose';

import { OtpType } from './otp';

// Create an interface representing a document in MongoDB.
export interface IOtpArchive {
  _id: string;
  userId?: string;
  otp: string;
  expiresAt: number;
  type: OtpType;
  createdAt: string;
  updatedAt: string;
}

// Put as much business logic in the models to keep the controllers as simple and lean as possible
// 2. Create a Schema corresponding to the document interface.
const otpSchema = new Schema(
  {
    userId: String,
    otp: String,
    expiresAt: Date,
    type: String,
  },
  {
    timestamps: true,
  }
);

const OtpArchive = model('OtpArchive', otpSchema);

export default OtpArchive;
