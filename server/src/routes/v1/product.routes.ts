import express from 'express';
import {
  create,
  list,
  read,
  update,
  remove,
  setProductRating,
  listRelatedProducts,
  getProductsTotal,
  listAll,
  uploadFile,
  removeFile,
  searchFilters,
  createWithCsv,
  listWithCsv,
} from '@src/controllers/product.controllers';
import { authenticate, authorize, validator } from '@src/middlewares';
import productValidation from '@src/validations/product.validation';

const router = express.Router();

router
  .route('/')
  .post(
    authenticate,
    authorize('admin', 'vendor'),
    validator(productValidation.create),
    create
  )
  .get(listAll);
router
  .route('/csv')
  .post(authenticate, authorize('admin'), createWithCsv)
  .get(listWithCsv);

router.post('/filtered', list);

router.get('/total', getProductsTotal);

router.post('/upload-file', authenticate, authorize('admin', 'vendor'), uploadFile);
router.post(
  '/remove-file',
  authenticate,
  authorize('admin', 'vendor'),
  removeFile
);

router
  .route('/:slug')
  .get(read)
  .put(authenticate, authorize('admin'), update)
  .delete(authenticate, authorize('admin'), remove);

router.put('/:productId/set-rating', authenticate, setProductRating);

router.get('/:productId/related', listRelatedProducts);

router.post('/search/filters', searchFilters);

export default router;
