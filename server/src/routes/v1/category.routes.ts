import { Router } from 'express';
import {
  create,
  read,
  update,
  remove,
  list,
  getCategorySubs,
} from '@src/controllers/category.controllers';
import { validator, authenticate, authorize } from '@src/middlewares';
import categoryValidation from '@src/validations/category.validation';

const router = Router();

router
  .route('/')
  .post(
    authenticate,
    authorize('admin'),
    validator(categoryValidation.create),
    create
  )
  .get(list);

router
  .route('/:id')
  .get(read)
  .patch(authenticate, authorize('admin'), update)
  .delete(authenticate, authorize('admin'), remove);

router.get('/:id/sub-categories', getCategorySubs);

export default router;
