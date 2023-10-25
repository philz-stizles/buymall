/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { Model } from 'mongoose';
import AppError from '@src/errors/app.error';
import { APIFeatures } from '@src/utils/api.utils';

export const createOne =
  (
    Entity: Model<any>
    // eslint-disable-next-line no-unused-vars
  ) =>
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> => {
    const newEntity = await Entity.create(req.body);

    try {
      return res.status(201).json({
        status: true,
        data: newEntity,
        message: 'created successfully',
      });
    } catch (error: any) {
      return next(error);
    }
  };

export const getOne =
  (Entity: Model<any>, populate?: any) =>
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> => {
    try {
      const query = Entity.findById(req.params.id);

      if (populate) {
        query.populate(populate);
      }

      const existingEntity = await query;

      if (!existingEntity)
        return next(new AppError('Resource does not exist', 404));

      return res.json({
        status: true,
        data: existingEntity,
        message: 'retrieved successfully',
      });
    } catch (error: any) {
      return next(error);
    }
  };

export const getAll =
  (Entity: Model<any>) =>
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> => {
    try {
      const features = new APIFeatures(Entity.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();

      const models = await features.query;

      return res.json({
        status: true,
        data: {
          items: models,
          count: models.length,
        },
        message: 'retrieved successfully',
      });
    } catch (error: any) {
      return next(error);
    }
  };

export const deleteOne =
  (Entity: Model<any>) =>
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> => {
    const doc = await Entity.findByIdAndDelete(req.params.id);

    if (!doc) return next(new AppError('Resource does not exist', 404));

    return res
      .status(204)
      .json({ status: true, data: null, message: 'Deleted successfully' });
  };

export const updateOne =
  (Entity: Model<any>) =>
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> => {
    console.log(req.body);
    const updatedModel = await Entity.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedModel)
      return next(new AppError('Resource does not exist', 404));

    return res.json({
      status: true,
      data: updatedModel,
      message: 'Updated successfully',
    });
  };
