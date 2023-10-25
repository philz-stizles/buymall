import { Schema, model, Types, Document, PopulatedDoc } from 'mongoose';
import { IUserDocument } from '@src/models/user.model';

export interface IAuditDocument {
  action: string;
  ip: string;
  method: string;
  type: string;
  payload: string;
  createdBy: PopulatedDoc<IUserDocument & Document>;
  createdAt: Date;
}

const schema = new Schema<IAuditDocument>(
  {
    action: {
      type: String,
      trim: true,
      required: [true, 'An action is required'],
    },
    ip: { type: String, required: true },
    type: { type: String, required: true },
    method: { type: String, required: true },
    payload: String,
    createdBy: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const Audit = model<IAuditDocument>('Audit', schema);

export default Audit;
