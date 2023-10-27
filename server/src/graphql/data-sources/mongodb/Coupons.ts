/* eslint-disable new-cap */
import { MongoDataSource } from 'apollo-datasource-mongodb';
import { ApolloError } from 'apollo-server-express';
import Coupon, { ICouponDocument } from '@src/models/coupon.model';
import { ICouponCreate, ICouponUpdate } from '@src/graphql/interfaces';

export class Coupons extends MongoDataSource<ICouponDocument> {
  async getById(id: string): Promise<ICouponDocument | null | undefined> {
    return await this.model.findById(id);
  }

  async list(): Promise<ICouponDocument[]> {
    return await this.model.find({});
  }

  async create(newCoupon: ICouponCreate): Promise<ICouponDocument> {
    const createdCoupon = await new this.model(newCoupon).save();
    return createdCoupon;
  }

  async update(updatedCoupon: ICouponUpdate): Promise<ICouponDocument> {
    const { _id, expiry, discount } = updatedCoupon;
    const modifiedCoupon = await this.model.findByIdAndUpdate(
      _id,
      { expiry, discount },
      { new: true }
    );
    if (!modifiedCoupon) {
      throw new ApolloError('Coupon does not exist', '404', {});
    }
    return modifiedCoupon;
  }

  async archive(id: string): Promise<ICouponDocument> {
    const modifiedCoupon = await this.model.findByIdAndUpdate(
      id,
      {
        isActive: false,
      },
      { new: true }
    );
    if (!modifiedCoupon) {
      throw new ApolloError('Coupon does not exist', '404', {});
    }
    return modifiedCoupon;
  }
}

export default new Coupons({ modelOrCollection: Coupon });
