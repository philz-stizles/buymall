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
    fullname: {
      type: String,
      required: [true, 'A user must have a fullname'],
      trim: true,
    },
    username: {
      type: String,
      trim: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'A user must have an email'],
      trim: true,
      unique: true,
      index: true,
      lowercase: true,
    },
    avatar: { type: String, default: 'default.jpg' },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minLength: 6,
      select: false,
    }, // Using select: false
    // will omit the field that it is assigned to from any read executions e.g find, findOne  etc.
    // It will not omit from create, save
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpiresIn: Date,
    roles: [{ type: Types.ObjectId, ref: 'Role' }],
    isActive: { type: Boolean, default: true, select: false },

    address: String,
    picture: String,

    tokens: [{ token: { type: String, required: true } }],
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

// userSchema.methods.toJSON = function () {
//   const user = this as ITransactionDocument;

//   // Create a JSON representation of the user
//   const userObject = user.toObject();

//   // Remove private data
//   delete userObject.password;
//   delete userObject.tokens;
//   delete userObject.avatar; // Remove avatar here coz the data is large for JSON requests

//   // Return public profile
//   return userObject;
// };

// Create and export model.
export default model<ITransactionDocument>('Transaction', schema);
