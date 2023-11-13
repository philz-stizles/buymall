import { Request, Response } from 'express';
import { ApiResponse, catchAsync } from '@src/utils/api.utils';
import { SizeService } from '@src/services';

export const create = catchAsync(async (req: Request, res: Response) => {
  const newSize = await SizeService.create({
    ...req.body,
    createdBy: req.user._id,
  });
  res.status(201).json(new ApiResponse('Created successfully', newSize));
});

export const list = catchAsync(async (req: Request, res: Response) => {
  const categories = await SizeService.list(req.query);
  res.json(new ApiResponse('Retrieved successfully', categories));
});

export const read = async (req: Request, res: Response) => {
  const size = await SizeService.readById(req.params.id);

  res.json(new ApiResponse('Retrieved successfully', size));
};

export const update = catchAsync(async (req: Request, res: Response) => {
  await SizeService.update(req.params.id, req.body);
  res.status(204).json(new ApiResponse('Updated successfully'));
});

export const remove = catchAsync(async (req: Request, res: Response) => {
  await SizeService.remove(req.params.id);
  res.json(new ApiResponse('Deleted successfully'));
});
