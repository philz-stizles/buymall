import { UpdateQuery, FilterQuery, QueryOptions } from 'mongoose';
import BadRequestError from '@src/errors/bad-request';
import NotFoundError from '@src/errors/not-found';
import Coupon, { ICoupon, ICouponDocument } from '@src/models/coupon.model';

const create = async (data: ICoupon) => {
  const existingCoupon = await Coupon.findOne({ name: data.name });
  if (existingCoupon) {
    throw new BadRequestError('Coupon already exists');
  }

  const newCoupon = await Coupon.create(data);

  return newCoupon;
};

const getById = async (id: string): Promise<ICouponDocument | null> => {
  const targetCoupon = await Coupon.findById(id);
  if (!targetCoupon) {
    throw new NotFoundError('Coupon does not exist');
  }
  return targetCoupon;
};

const getMany = async (
  query: Record<string, any>,
  options: QueryOptions = { lean: true }
) => {
  // If you're executing a query and sending the results without modification to, say, an Express response,
  // you should use lean.In general, if you do not modify the query results and do not use custom getters,
  // you should use lean(). If you modify the query results or rely on features like getters or transforms,
  // you should not use lean().
  let queryStr = JSON.stringify(query);
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);
  const filterQuery = JSON.parse(queryStr);
  return await Coupon.find({ vendor: query.vendor }, {}, options)
    .sort({ createdAt: -1 })
    .exec();
};

const update = async (
  id: string,
  update: UpdateQuery<ICouponDocument>,
  options: QueryOptions = { new: true }
) => {
  const targetCoupon = await Coupon.findByIdAndUpdate(id, update, options);
  if (!targetCoupon) {
    throw new NotFoundError('Coupon does not exist');
  }
};

const remove = async (id: string) => {
  const targetCoupon = await Coupon.findByIdAndDelete(id).exec();
  if (!targetCoupon) {
    throw new NotFoundError('Coupon does not exist');
  }
};

export default {
  create,
  getMany,
  getById,
  update,
  remove,
};
