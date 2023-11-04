/* eslint-disable @typescript-eslint/no-explicit-any */
import { Schema, model, Types, Document, PopulatedDoc } from 'mongoose';
import { OrderDocument } from '@src/models/order.model';
import { IUserDocument } from '@src/models/user.model';

// Create an interface representing a document in MongoDB.
export interface ITransactionDocument extends Document {
  transactionId: string;
  order: PopulatedDoc<OrderDocument & Document>;
  createdBy: PopulatedDoc<IUserDocument & Document>;
  status: string;
  createdAt: string;
  updatedAt: string;
}

// Put as much business logic in the models to keep the controllers as simple and lean as possible
// 2. Create a Schema corresponding to the document interface.
const schema = new Schema(
  {
    transactionId: String,
    order: {
      type: Types.ObjectId,
      ref: 'Order',
    },
    createdBy: { type: Types.ObjectId, ref: 'User' },
    status: { type: String },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

// Create and export model.
export default model<ITransactionDocument>('Transaction', schema);
