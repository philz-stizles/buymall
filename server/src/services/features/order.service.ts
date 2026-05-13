import { UpdateQuery, FilterQuery, QueryOptions } from 'mongoose';
import slugify from 'slugify';
import BadRequestError from '@src/errors/bad-request';
import NotFoundError from '@src/errors/not-found';
import Order, { IOrder, IOrderDocument } from '@src/models/order.model';
import { CloudinaryService } from '..';

type OrderInput = {
  name: string;
  description?: string;
  image: string;
};

const create = async (data: Partial<IOrder>): Promise<IOrderDocument> => {
  // Create a new order.
  const order = await Order.create({ ...data });

  order.save();

  return order;
};

const findBySlug = async (
  query: FilterQuery<IOrderDocument>
): Promise<IOrderDocument | null> => {
  const targetOrder = await Order.findOne(query);
  if (!targetOrder) {
    throw new NotFoundError('Order does not exist');
  }
  return targetOrder;
};

const list = async (
  query: FilterQuery<IOrderDocument>,
  options: QueryOptions = {} // { lean: true }
) => {
  // If you're executing a query and sending the results without modification to, say, an Express response,
  // you should use lean.In general, if you do not modify the query results and do not use custom getters,
  // you should use lean(). If you modify the query results or rely on features like getters or transforms,
  // you should not use lean().
  //  const query = Order.find(query, {}, options) // .sort({ createdAt: -1 });
  let filterQuery: any = {};

  if (query.search) {
    console.log(query.search);
    filterQuery['$or'] = [
      {
        name: {
          $regex: query.search,
          $options: 'i',
        },
      },
      {
        description: {
          $regex: query.search,
          $options: 'i',
        },
      },
    ];
  }
  const count = await Order.count();
  const categories = await Order.find(filterQuery, {}, options).sort({
    createdAt: -1,
  });
  return { data: categories, count };
};

const readById = async (
  id: string,
  options: QueryOptions = {} // { lean: true }
) => {
  return Order.findById(id, {}, options).exec();
};

const update = async (
  id: string,
  update: UpdateQuery<IOrderDocument>,
  options: QueryOptions = { new: true }
) => {
  const targetOrder = await Order.findByIdAndUpdate(
    id,
    { ...update, slug: slugify(update.name) },
    options
  );

  if (!targetOrder) {
    throw new NotFoundError('Order does not exist');
  }
};

export const remove = async (id: string) => {
  const targetOrder = await Order.findByIdAndDelete(id);
  if (!targetOrder) {
    throw new NotFoundError('Order does not exist');
  }
};

export default { create, list, readById, update, remove };
