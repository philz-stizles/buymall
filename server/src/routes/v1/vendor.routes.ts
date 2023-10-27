import { Router } from 'express';
import { authenticate, authorize, validator } from '@src/middlewares';
import {
  read,
  update,
  remove,
  list,
} from '@src/controllers/vendor.controllers';
import vendorValidation from '@src/validations/vendor.validation';

const router = Router();

// Authenticate all routes after this middleware
// router.use(authenticate)

router.route('/').get(authenticate, authorize('admin', 'vendor'), list);

router
  .route('/:id')
  .get(read)
  .patch(
    authenticate,
    authorize('admin', 'vendor'),
    validator(vendorValidation.update),
    update
  )
  .delete(authenticate, authorize('admin', 'vendor'), remove);

export default router;
