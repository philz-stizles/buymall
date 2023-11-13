import { Router } from 'express';
import {
  create,
  read,
  update,
  remove,
  list,
} from '@src/controllers/color.controllers';
import { validator, authenticate, authorize } from '@src/middlewares';
import colorValidation from '@src/validations/color.validation';

const router = Router();

router
  .route('/')
  .post(
    authenticate,
    authorize('admin'),
    validator(colorValidation.create),
    create
  )
  .get(list);

router
  .route('/:id')
  .get(read)
  .patch(authenticate, authorize('admin'), update)
  .delete(authenticate, authorize('admin'), remove);

export default router;
