import { Schema, Types, model, Document, PopulatedDoc } from 'mongoose';
import { IUserDocument } from '@src/models//user.model';

interface IOrderProduct {
  product: Types.ObjectId;
  count: number;
  color: string;
}

export interface OrderDocument extends Document {
  products: IOrderProduct[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  paymentIntent: any;
  status: string;
  createdBy: PopulatedDoc<IUserDocument & Document>;
  createdAt: string;
  updatedAt: string;
}

const schema = new Schema(
  {
    products: [
      {
        product: { type: Types.ObjectId, ref: 'Product' },
        count: Number,
        color: String,
      },
    ],
    paymentIntent: {},
    status: {
      type: String,
      default: 'Not Processed',
      enum: [
        'Not Processed',
        'processing',
        'Dispatched',
        'Cancelled',
        'Completed',
      ],
    },
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

export default model<OrderDocument>('Order', schema);
