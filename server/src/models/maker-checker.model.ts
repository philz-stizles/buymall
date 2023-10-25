import { Schema, model, Types, Document, PopulatedDoc } from 'mongoose';
import { IUserDocument } from '@src/models/user.model';

export interface IMakerCheckerDocument extends Document {
  name: string;
  slug: string;
  approvers: PopulatedDoc<IUserDocument & Document>[];
  createdAt: Date;
  updatedAt: Date;
}

const makerCheckerSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: 'Name is required',
      minlength: [2, 'Too short'],
      maxlength: [32, 'Too long'],
    },
    payload: String,
    approvers: [{ type: Types.ObjectId, ref: 'User' }],
    numberOfStages: Number,
    currentStage: Number,
    slug: { type: String, unique: true, lowercase: true, index: true },
  },
  { timestamps: true }
);

const MakerChecker = model<IMakerCheckerDocument>(
  'MakerChecker',
  makerCheckerSchema
);

export default MakerChecker;
