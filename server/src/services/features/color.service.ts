import { UpdateQuery, FilterQuery, QueryOptions } from 'mongoose';
import slugify from 'slugify';
import BadRequestError from '@src/errors/bad-request';
import NotFoundError from '@src/errors/not-found';
import Color, { IColorDocument } from '@src/models/color.model';
import { CloudinaryService } from '..';

type ColorInput = {
  name: string;
  description?: string;
  image: string;
};

const create = async (data: ColorInput): Promise<IColorDocument> => {
  const existingColor = await Color.findOne({ name: data.name });
  if (existingColor) {
    throw new BadRequestError('Color already exists');
  }
  return await Color.create({ ...data, slug: slugify(data.name) });
};

const findBySlug = async (
  query: FilterQuery<IColorDocument>
): Promise<IColorDocument | null> => {
  const targetColor = await Color.findOne(query);
  if (!targetColor) {
    throw new NotFoundError('Color does not exist');
  }
  return targetColor;
};

const list = async (
  query: FilterQuery<IColorDocument>,
  options: QueryOptions = {} // { lean: true }
) => {
  // If you're executing a query and sending the results without modification to, say, an Express response,
  // you should use lean.In general, if you do not modify the query results and do not use custom getters,
  // you should use lean(). If you modify the query results or rely on features like getters or transforms,
  // you should not use lean().
  //  const query = Color.find(query, {}, options) // .sort({ createdAt: -1 });
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
  const count = await Color.count();
  const colors = await Color.find(filterQuery, {}, options).sort({
    createdAt: -1,
  });
  return { data: colors, count };
};

const readById = async (
  id: string,
  options: QueryOptions = {} // { lean: true }
) => {
  return Color.findById(id, {}, options).exec();
};

const update = async (
  id: string,
  update: UpdateQuery<IColorDocument>,
  options: QueryOptions = { new: true }
) => {
  const targetColor = await Color.findByIdAndUpdate(
    id,
    { ...update, slug: slugify(update.name) },
    options
  );

  if (!targetColor) {
    throw new NotFoundError('Color does not exist');
  }
};

export const remove = async (id: string) => {
  const targetColor = await Color.findByIdAndDelete(id);
  if (!targetColor) {
    throw new NotFoundError('Color does not exist');
  }
};

export default { create, list, readById, update, remove };
