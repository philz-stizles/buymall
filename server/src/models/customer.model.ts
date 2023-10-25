import { Schema, model, Document, Types, PopulatedDoc } from 'mongoose';
import { IAddress } from '@src/interfaces/IAddress';
import { IUserDocument } from '@src/models/user.model';

export interface ICartProduct {
  product: { _id: Types.ObjectId };
  count: number;
  color: string;
  price: number;
}

// 1. Create an type from a document in MongoDB.
export interface ICustomerDocument {
  cart: ICartProduct[];
  wishlist: Types.ObjectId[];
  addresses: IAddress[];
  account: PopulatedDoc<IUserDocument & Document>;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
}

// Put as much customer logic in the models to keep the controllers as simple and lean as possible
// 2. Create a Schema corresponding to the document interface.
const schema = new Schema<ICustomerDocument>(
  {
    cart: { type: Array, default: [] },
    wishlist: [{ type: Types.ObjectId, ref: 'Product' }],
    addresses: [
      {
        street: String,
        city: String,
        state: String,
        country: String,
        main: Boolean,
      },
    ],
    account: { type: Types.ObjectId, ref: 'User', required: true },
    phone: String,
  },
  { timestamps: true }
);

// 3. Create a Model.
const Customer = model<ICustomerDocument>('Customer', schema);

export default Customer;
