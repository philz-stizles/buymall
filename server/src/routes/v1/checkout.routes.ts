import express from 'express';
import {
  checkout,
  createPaymentIntent,
} from '@src/controllers/stripe.controllers';
import { authenticate } from '@src/middlewares/auth.middlewares';

const router = express.Router();

router.post('/', checkout);

export default router;
