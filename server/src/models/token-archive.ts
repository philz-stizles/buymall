import jwt from 'jsonwebtoken';
import { Model, Schema, model } from 'mongoose';
import config from '@src/config';
import moment, { Moment } from 'moment';
import { TokenType } from './token';

// Create an interface representing a document in MongoDB.
export interface ITokenArchive {
  _id: string;
  userId?: string;
  token: string;
  expiresAt: number;
  type: TokenType;
  createdAt: string;
  updatedAt: string;
}

// Put as much business logic in the models to keep the controllers as simple and lean as possible
// 2. Create a Schema corresponding to the document interface.
const tokenSchema = new Schema(
  {
    userId: String,
    token: String,
    expiresAt: Date,
    type: String,
  },
  {
    timestamps: true,
  }
);

const TokenArchive = model('TokenArchive', tokenSchema);

export default TokenArchive;
