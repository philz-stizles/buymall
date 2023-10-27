import axios from 'axios';
import { baseUrl } from '../constants';

export const createPaymentIntent = (
  isCouponApplied: boolean,
  authToken: string
) =>
  axios.post(
    `${baseUrl}/stripe/payment-intent`,
    { isCouponApplied },
    { headers: { authToken } }
  );
