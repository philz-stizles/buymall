/* eslint-disable @typescript-eslint/no-explicit-any */
import { MongoDataSource } from 'apollo-datasource-mongodb';
import { Query, Types } from 'mongoose';
import { ICategoryDocument } from '@src/models/category.model';
import { Category } from '@src/models';

export class Categories extends MongoDataSource<ICategoryDocument> {
  getCategory(
    id: Types.ObjectId
  ): Promise<ICategoryDocument | null | undefined> {
    return this.findOneById(id);
  }

  getCategories(): Query<ICategoryDocument[], ICategoryDocument, any> {
    return this.model.find();
  }
}

export default new Categories({ modelOrCollection: Category });