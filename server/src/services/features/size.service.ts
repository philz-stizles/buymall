import { UpdateQuery, FilterQuery, QueryOptions } from 'mongoose';
import slugify from 'slugify';
import BadRequestError from '@src/errors/bad-request';
import NotFoundError from '@src/errors/not-found';
import Size, { ISizeDocument } from '@src/models/size.model';
import { CloudinaryService } from '..';

type SizeInput = {
  name: string;
  description?: string;
  image: string;
};

const create = async (data: SizeInput): Promise<ISizeDocument> => {
  const existingSize = await Size.findOne({ name: data.name });
  if (existingSize) {
    throw new BadRequestError('Size already exists');
  }

  return await Size.create({ ...data, slug: slugify(data.name) });
};

const findBySlug = async (
  query: FilterQuery<ISizeDocument>
): Promise<ISizeDocument | null> => {
  const targetSize = await Size.findOne(query);
  if (!targetSize) {
    throw new NotFoundError('Size does not exist');
  }
  return targetSize;
};

const list = async (
  query: FilterQuery<ISizeDocument>,
  options: QueryOptions = {} // { lean: true }
) => {
  // If you're executing a query and sending the results without modification to, say, an Express response,
  // you should use lean.In general, if you do not modify the query results and do not use custom getters,
  // you should use lean(). If you modify the query results or rely on features like getters or transforms,
  // you should not use lean().
  //  const query = Size.find(query, {}, options) // .sort({ createdAt: -1 });
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
  const count = await Size.count();
  const sizes = await Size.find(filterQuery, {}, options).sort({
    createdAt: -1,
  });
  return { data: sizes, count };
};

const readById = async (
  id: string,
  options: QueryOptions = {} // { lean: true }
) => {
  return Size.findById(id, {}, options).exec();
};

const update = async (
  id: string,
  update: UpdateQuery<ISizeDocument>,
  options: QueryOptions = { new: true }
) => {
  const targetSize = await Size.findByIdAndUpdate(
    id,
    { ...update, slug: slugify(update.name) },
    options
  );

  if (!targetSize) {
    throw new NotFoundError('Size does not exist');
  }
};

export const remove = async (id: string) => {
  const targetSize = await Size.findByIdAndDelete(id);
  if (!targetSize) {
    throw new NotFoundError('Size does not exist');
  }
};

export default { create, list, readById, update, remove };
