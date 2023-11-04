import express from 'express';
import { create, listByUser } from '@src/controllers/order.controllers';
import { authenticate } from '@src/middlewares/auth.middlewares';
import { authCheck } from '@src/firebase/auth.middleware';

const router = express.Router();

router.use(authCheck);
// router.use(authenticate);

router.route('/').post(create).get(listByUser);
// router.route('/orders/filtered').post(filteredList);

export default router;
