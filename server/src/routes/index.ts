import swaggerUI from 'swagger-ui-express';
import express from 'express';
import authRoutes from './v1/auth.routes';
import userRoutes from './v1/user.routes';
import vendorRoutes from './v1/vendor.routes';
import productRoutes from './v1/product.routes';
import categoryRoutes from './v1/category.routes';
import subCategoryRoutes from './v1/sub-category.routes';
import couponRoutes from './v1/coupon.routes';
import swaggerDoc from '@src/docs';
import logger from '@src/config/logger';
import config from '@src/config';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/categories', categoryRoutes);
router.use('/sub-categories', subCategoryRoutes);
router.use('/vendors', vendorRoutes);
router.use('/products', productRoutes);
router.use('/coupons', couponRoutes);

// API documentation.
if (config.env !== 'production') {
  const docsEndpoint = '/docs';
  router.use(docsEndpoint, swaggerUI.serve, swaggerUI.setup(swaggerDoc));
  const { baseUrl, baseEndpoint } = config.api;
  logger.info(`API Docs available @${baseUrl}${baseEndpoint}${docsEndpoint}`);
}

export default router;
