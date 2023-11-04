import { UpdateQuery, FilterQuery, QueryOptions } from 'mongoose';
import slugify from 'slugify';
import BadRequestError from '@src/errors/bad-request';
import NotFoundError from '@src/errors/not-found';
import Category, {
  ICategory,
  ICategoryDocument,
} from '@src/models/category.model';

const create = async (data: ICategory): Promise<ICategoryDocument> => {
  const existingCategory = await Category.findOne({ name: data.name });
  if (existingCategory) {
    throw new BadRequestError('Category already exists');
  }

  return await Category.create({ ...data, slug: slugify(data.name) });
};

const findBySlug = async (
  query: FilterQuery<ICategoryDocument>
): Promise<ICategoryDocument | null> => {
  const targetCategory = await Category.findOne(query);
  if (!targetCategory) {
    throw new NotFoundError('Category does not exist');
  }
  return targetCategory;
};

const list = async (
  query: FilterQuery<ICategoryDocument>,
  options: QueryOptions = {} // { lean: true }
) => {
  // If you're executing a query and sending the results without modification to, say, an Express response,
  // you should use lean.In general, if you do not modify the query results and do not use custom getters,
  // you should use lean(). If you modify the query results or rely on features like getters or transforms,
  // you should not use lean().
  return Category.find(query, {}, options).sort({ createdAt: -1 });
};

const update = async (
  query: FilterQuery<ICategoryDocument>,
  update: UpdateQuery<ICategoryDocument>,
  options: QueryOptions = { new: true }
) => {
  const targetCategory = await Category.findOneAndUpdate(
    query,
    { ...update, slug: slugify(update.name) },
    options
  );
  if (!targetCategory) {
    throw new NotFoundError('Category does not exist');
  }
  return targetCategory;
};

export const remove = async (query: FilterQuery<ICategoryDocument>) => {
  const targetCategory = await Category.findOneAndDelete(query);
  if (!targetCategory) {
    throw new NotFoundError('Category does not exist');
  }
  return targetCategory;
};

export default { create, list, update, remove };
