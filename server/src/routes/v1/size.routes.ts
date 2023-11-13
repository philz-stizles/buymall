import { Router } from 'express';
import {
  create,
  read,
  update,
  remove,
  list,
} from '@src/controllers/size.controllers';
import { validator, authenticate, authorize } from '@src/middlewares';
import sizeValidation from '@src/validations/size.validation';

const router = Router();

router
  .route('/')
  .post(
    authenticate,
    authorize('admin'),
    validator(sizeValidation.create),
    create
  )
  .get(list);

router
  .route('/:id')
  .get(read)
  .patch(authenticate, authorize('admin'), update)
  .delete(authenticate, authorize('admin'), remove);

export default router;
