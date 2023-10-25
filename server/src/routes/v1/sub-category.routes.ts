import express from 'express';
import { authenticate, authorize } from '@src/middlewares/auth.middlewares';
import {
  create,
  read,
  update,
  remove,
  list,
} from '@src/controllers/sub-category.controllers';

const router = express.Router();

// routes
router.route('/').post(authenticate, authorize('admin'), create).get(list);

router
  .route('/:slug')
  .get(read)
  .put(authenticate, authorize('admin'), update)
  .delete(authenticate, authorize('admin'), remove);

export default router;
