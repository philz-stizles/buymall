import { Request, Response } from 'express';
import { ApiResponse, catchAsync } from '@src/utils/api.utils';
import { VendorService } from '@src/services';


export const list = catchAsync(async (req: Request, res: Response) => {
  const vendors = await VendorService.getMany({});
  res.json(new ApiResponse('Retrieved successfully', vendors));
});

export const read = catchAsync(async (req: Request, res: Response) => {
  const vendors = await VendorService.getById(req.params.id);
  res.json(new ApiResponse('Retrieved successfully', vendors));
});

export const update = catchAsync(async (req: Request, res: Response) => {
  await VendorService.update(req.params.id, req.body);
  res.status(204).json(new ApiResponse('Updated successfully'));
});

export const remove = catchAsync(async (req: Request, res: Response) => {
  await VendorService.remove(req.params.id);
  res.status(204).json(new ApiResponse('Deleted successfully'));
});
