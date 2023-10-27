import { MongoDataSource } from 'apollo-datasource-mongodb';
import { Types } from 'mongoose';
import Cart, { ICartDocument } from '@src/models/cart.model';

export class Carts extends MongoDataSource<ICartDocument> {
  getCart(id: Types.ObjectId): Promise<ICartDocument | null | undefined> {
    return this.findOneById(id);
  }
}

export default new Carts({ modelOrCollection: Cart });