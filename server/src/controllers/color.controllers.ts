import { Request, Response } from 'express';
import { ApiResponse, catchAsync } from '@src/utils/api.utils';
import { ColorService } from '@src/services';

export const create = catchAsync(async (req: Request, res: Response) => {
  const newColor = await ColorService.create({
    ...req.body,
    createdBy: req.user._id,
  });
  res.status(201).json(new ApiResponse('Created successfully', newColor));
});

export const list = catchAsync(async (req: Request, res: Response) => {
  const colors = await ColorService.list(req.query);
  res.json(new ApiResponse('Retrieved successfully', colors));
});

export const read = async (req: Request, res: Response) => {
  const color = await ColorService.readById(req.params.id);

  res.json(new ApiResponse('Retrieved successfully', color));
};

export const update = catchAsync(async (req: Request, res: Response) => {
  await ColorService.update(req.params.id, req.body);
  res.status(204).json(new ApiResponse('Updated successfully'));
});

export const remove = catchAsync(async (req: Request, res: Response) => {
  await ColorService.remove(req.params.id);
  res.json(new ApiResponse('Deleted successfully'));
});
