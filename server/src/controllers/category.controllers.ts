import { Request, Response } from 'express';
import Category from '@src/models/category.model';
import Product from '@src/models/product.model';
import Sub from '@src/models/sub-category.model';
import { ApiResponse, catchAsync } from '@src/utils/api.utils';
import { CategoryService } from '@src/services';
import { SubCategory } from '@src/models';

export const create = catchAsync(async (req: Request, res: Response) => {
  const newCategory = await CategoryService.create({
    ...req.body,
    createdBy: req.user._id,
  });
  res.status(201).json(new ApiResponse('Created successfully', newCategory));
});

export const list = catchAsync(async (req: Request, res: Response) => {
  const categories = await CategoryService.list({});
  res.json(new ApiResponse('Retrieved successfully', categories));
});

export const read = async (req: Request, res: Response): Promise<Response> => {
  const category = await Category.findOne({ slug: req.params.slug }).exec();
  if (!category) {
    return res.status(404).json({ status: false });
  }

  const products = await Product.find({
    category,
  })
    .populate('category')
    .exec();
  // const products = await Product.find({ category }).populate('category').exec();

  return res.json({ category, products });
};

export const update = catchAsync(async (req: Request, res: Response) => {
  const updated = await CategoryService.update(
    { slug: req.params.slug },
    req.body
  );
  res.json(new ApiResponse('Updated successfully', updated));
});

export const remove = catchAsync(async (req: Request, res: Response) => {
  const removed = await CategoryService.remove({
    slug: req.params.slug,
  });
  res.json(new ApiResponse('Deleted successfully', removed));
});

export const getCategorySubs = catchAsync(
  async (req: Request, res: Response) => {
    const subs = await SubCategory.find({ parent: req.params.id });

    return res.json(new ApiResponse('Retrieved successfully', subs));
  }
);
