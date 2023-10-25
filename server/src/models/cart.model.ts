import { Schema, Types, model, Document, PopulatedDoc } from 'mongoose';
import { IUserDocument } from '@src/models/user.model';

export interface ICartProduct {
  product: { _id: Types.ObjectId };
  count: number;
  color: string;
  price: number;
}

export interface ICartDocument extends Document {
  products: ICartProduct[];
  totalAmount: number;
  totalAfterDiscount: number;
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
        price: Number,
      },
    ],
    totalAmount: { type: Number, required: true },
    totalAfterDiscount: Number,
    createdBy: { type: Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

const Cart = model<ICartDocument>('Cart', schema);
export default Cart;
