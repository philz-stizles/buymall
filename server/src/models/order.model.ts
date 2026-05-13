import { Schema, Types, model, Document, PopulatedDoc, Model } from 'mongoose';
import { IUserDocument } from '@src/models//user.model';

interface IOrderProduct {
  product: Types.ObjectId;
  quantity: number;
  color: string;
}

export interface IOrder {
  isPaid: boolean;
  products: IOrderProduct[];
  paymentIntent: any;
  status: string;
  createdBy: PopulatedDoc<IUserDocument & Document>;
  createdAt: string;
  updatedAt: string;
}

export interface IOrderDocument extends Document, IOrder {}

export interface IOrderModel extends Model<IOrderDocument> {}

const schema = new Schema<IOrderDocument, IOrderModel>(
  {
    isPaid: { type: Boolean, default: false },
    products: [
      {
        product: { type: Types.ObjectId, ref: 'Product' },
        quantity: Number,
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

export default model<IOrderDocument, IOrderModel>('Order', schema);
