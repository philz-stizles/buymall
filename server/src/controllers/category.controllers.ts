import { Request, Response } from 'express';
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
  const categories = await CategoryService.list(req.query);
  res.json(new ApiResponse('Retrieved successfully', categories));
});

export const read = async (req: Request, res: Response) => {
  const category = await CategoryService.readById(req.params.id);

  res.json(new ApiResponse('Retrieved successfully', category));
};

// export const read = async (req: Request, res: Response) => {
//   const category = await CategoryService.readById(req.params.id);
//   if (!category) {
//     return res.status(404).json({ status: false });
//   }

//   const products = await Product.find({
//     category,
//   })
//     .populate('category')
//     .exec();
//   // const products = await Product.find({ category }).populate('category').exec();

//   return res.json({ category, products });
// };

export const update = catchAsync(async (req: Request, res: Response) => {
  await CategoryService.update(req.params.id, req.body);
  res.status(204).json(new ApiResponse('Updated successfully'));
});

export const remove = catchAsync(async (req: Request, res: Response) => {
  await CategoryService.remove(req.params.id);
  res.json(new ApiResponse('Deleted successfully'));
});

export const getCategorySubs = catchAsync(
  async (req: Request, res: Response) => {
    const subs = await SubCategory.find({ category: req.params.id });

    return res.json(new ApiResponse('Retrieved successfully', subs));
  }
);
