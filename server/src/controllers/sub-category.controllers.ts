import { FilterQuery } from 'mongoose';
import { Request, Response } from 'express';
import SubCategory from '@src/models/sub-category.model';
import Product, { IProductDocument } from '@src/models/product.model';
import { ApiResponse, catchAsync } from '@src/utils/api.utils';
import { SubCategoryService } from '@src/services';

export const create = catchAsync(async (req: Request, res: Response) => {
  const created = await SubCategoryService.create(req.body);
  res.json(new ApiResponse('Created successfully', created));
});

export const list = catchAsync(async (req: Request, res: Response) => {
  const subCats = await SubCategoryService.list(req.query || {});
  res.json(new ApiResponse('Created successfully', subCats));
});

export const read = async (req: Request, res: Response) => {
  const subCategory = await SubCategory.findOne({
    slug: req.params.slug,
  }).exec();
  const products = await Product.find({
    subs: subCategory,
  } as FilterQuery<IProductDocument>)
    .populate('category')
    .exec();

  res.json({ subCategory, products });
};

export const update = catchAsync(async (req: Request, res: Response) => {
  const updated = await SubCategoryService.update(req.params.id, req.body);
  res.json(new ApiResponse('Updated Successfully', updated));
});

export const remove = catchAsync(async (req: Request, res: Response) => {
  const deleted = await SubCategory.findOneAndDelete({
    slug: req.params.slug,
  });
  res.json(new ApiResponse('Updated Successfully', deleted));
});
