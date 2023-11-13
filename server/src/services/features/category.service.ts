import { UpdateQuery, FilterQuery, QueryOptions } from 'mongoose';
import slugify from 'slugify';
import BadRequestError from '@src/errors/bad-request';
import NotFoundError from '@src/errors/not-found';
import Category, {
  ICategoryDocument,
} from '@src/models/category.model';
import { CloudinaryService } from '..';

type CategoryInput = {
  name: string;
  description?: string;
  image: string;
};

const create = async (data: CategoryInput): Promise<ICategoryDocument> => {
  const existingCategory = await Category.findOne({ name: data.name });
  if (existingCategory) {
    throw new BadRequestError('Category already exists');
  }

  // Create a new category.
  const category = await Category.create({ ...data, slug: slugify(data.name) });

  // Upload category cover image.
  const result = await CloudinaryService.uploadFile(data.image);

  // Save cover image url to the category.
  category.image = {
    public_id: result.public_id,
    url: result.secure_url,
  };

  category.save();

  return category;
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
  //  const query = Category.find(query, {}, options) // .sort({ createdAt: -1 });
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
  const count = await Category.count();
  const categories = await Category.find(filterQuery, {}, options).sort({ createdAt: -1 });
  return { data: categories, count };
};

const readById = async (
  id: string,
  options: QueryOptions = {} // { lean: true }
) => {
  return Category.findById(id, {}, options).exec();
};

const update = async (
  id: string,
  update: UpdateQuery<ICategoryDocument>,
  options: QueryOptions = { new: true }
) => {
  const targetCategory = await Category.findByIdAndUpdate(
    id,
    { ...update, slug: slugify(update.name) },
    options
  );

  if (!targetCategory) {
    throw new NotFoundError('Category does not exist');
  }
};

export const remove = async (id: string) => {
  const targetCategory = await Category.findByIdAndDelete(id);
  if (!targetCategory) {
    throw new NotFoundError('Category does not exist');
  }
};

export default { create, list, readById, update, remove };
