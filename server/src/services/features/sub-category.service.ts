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
  options: QueryOptions = {}// = { lean: true }
) => {
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
  const count = await SubCategory.count();
  const subCategories = await SubCategory.find(filterQuery, {}, options).sort({
    createdAt: -1,
  });
  return { data: subCategories, count };
};

const update = async (
  id: string,
  update: UpdateQuery<ISubCategoryDocument>,
  options: QueryOptions = { new: true }
) => {
  const category = await SubCategory.findByIdAndUpdate(
    id,
    { ...update, slug: slugify(update.name) },
    options
  );

  if (!category) {
    throw new NotFoundError('Sub Category does not exist');
  }
  return category;
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
