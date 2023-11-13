import { Request, Response } from 'express';
import { ApiResponse, catchAsync } from '@src/utils/api.utils';
import { CouponService } from '@src/services';

export const create = catchAsync(async (req: Request, res: Response) => {
  const newCoupon = await CouponService.create({
    ...req.body,
    vendor: req.vendor,
    createdBy: req.user,
  });
  res.status(201).json(new ApiResponse('Created successfully', newCoupon));
});

export const list = catchAsync(async (req: Request, res: Response) => {
  const coupons = await CouponService.getMany({
    ...req.query,
    vendor: req.vendor,
  });
  res.json(new ApiResponse('Retrieved successfully', coupons));
});

export const read = catchAsync(async (req: Request, res: Response) => {
  const coupons = await CouponService.getById(req.params.id);
  res.json(new ApiResponse('Retrieved successfully', coupons));
});

export const update = catchAsync(async (req: Request, res: Response) => {
  await CouponService.update(req.params.id, req.body);
  res.status(204).json(new ApiResponse('Updated successfully'));
});

export const remove = catchAsync(async (req: Request, res: Response) => {
  await CouponService.remove(req.params.id);
  res.status(204).json(new ApiResponse('Deleted successfully'));
});
