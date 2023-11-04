import { UpdateQuery, FilterQuery, QueryOptions } from 'mongoose';
import BadRequestError from '@src/errors/bad-request';
import NotFoundError from '@src/errors/not-found';
import SubCategory, {
  ISubCategoryDocument,
} from '@src/models/sub-category.model';
import slugify from 'slugify';

const create = async (
  input: ISubCategoryDocument
): Promise<ISubCategoryDocument> => {
  const existingSubCategory = await SubCategory.findOne({
    name: input.name,
  });
  if (existingSubCategory) {
    throw new BadRequestError('Sub Category already exists');
  }

  const newSubCategory = await SubCategory.create({
    ...input,
    slug: slugify(input.name),
  });

  return newSubCategory;
};

const findBySlug = async (
  query: FilterQuery<ISubCategoryDocument>
): Promise<ISubCategoryDocument | null> => {
  const targetSubCategory = await SubCategory.findOne(query);
  if (!targetSubCategory) {
    throw new NotFoundError('Sub Category does not exist');
  }
  return targetSubCategory;
};

const list = async (
  query: FilterQuery<ISubCategoryDocument>,
  options: QueryOptions = { lean: true }
) => {
  // If you're executing a query and sending the results without modification to, say, an Express response,
  // you should use lean.In general, if you do not modify the query results and do not use custom getters,
  // you should use lean(). If you modify the query results or rely on features like getters or transforms,
  // you should not use lean().
  return SubCategory.find(query, {}, options).sort({ createdAt: -1 }).exec();
};

const update = async (
  id: string,
  update: UpdateQuery<ISubCategoryDocument>,
  options: QueryOptions = { new: true }
) => {
  const targetSubCategory = await SubCategory.findByIdAndUpdate(
    id,
    { ...update, slug: slugify(update.name) },
    options
  );
  // { slug: req.params.slug },

  if (!targetSubCategory) {
    throw new NotFoundError('Sub Category does not exist');
  }
  return targetSubCategory;
};

const archive = async (query: FilterQuery<ISubCategoryDocument>) => {
  const targetSubCategory = await SubCategory.deleteOne(query);
  if (!targetSubCategory) {
    throw new NotFoundError('Sub Category does not exist');
  }
  return targetSubCategory;
};

export default {
  create,
  list,
  update,
  archive,
};
