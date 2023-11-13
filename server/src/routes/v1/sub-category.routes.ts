import express from 'express';
import { authenticate, authorize } from '@src/middlewares/auth.middlewares';
import {
  create,
  read,
  update,
  remove,
  list,
} from '@src/controllers/sub-category.controllers';
import { validator } from '@src/middlewares';
import subCategoryValidation from '@src/validations/sub-category.validation';

const router = express.Router();

// routes
router
  .route('/')
  .post(
    authenticate,
    authorize('admin'),
    validator(subCategoryValidation.create),
    create
  )
  .get(list);

router
  .route('/:id')
  .get(read)
  .patch(authenticate, authorize('admin'), update)
  .delete(authenticate, authorize('admin'), remove);

export default router;
