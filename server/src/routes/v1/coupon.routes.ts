// External libraries
import express from 'express';
import { authenticate, authorize, validator } from '@src/middlewares';
import { create, read, update, remove, list } from '@src/controllers/coupon.controllers';
import couponValidation from '@src/validations/coupon.validation';

const router = express.Router();

router
  .route('/')
  .post(
    authenticate,
    authorize('admin', 'vendor'),
    validator(couponValidation.create),
    create
  )
  .get(authenticate, authorize('admin', 'vendor'), list);

router
  .route('/:id')
  .get(read)
  .patch(
    authenticate,
    authorize('admin', 'vendor'),
    validator(couponValidation.update),
    update
  )
  .delete(authenticate, authorize('admin', 'vendor'), remove);

export default router;
