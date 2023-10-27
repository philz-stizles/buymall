import { baseUrl } from '../constants';
import axios from 'axios';

export const createOrder = async (stripeResponse: any, authToken: string) =>
  await axios.post(
    `${baseUrl}/orders`,
    { stripeResponse },
    { headers: { authToken } }
  );

export const createCashOrder = async (
  authToken: string,
  COD: any,
  couponTrueOrFalse: boolean
) =>
  await axios.post(
    `${baseUrl}/orders/cash-order`,
    { couponApplied: couponTrueOrFalse, COD },
    {
      headers: {
        authToken,
      },
    }
  );

export const getUserOrders = async (authToken: string) =>
  await axios.get(`${baseUrl}/orders/by-user`, { headers: { authToken } });

export const getAllOrders = async (authToken: string) =>
  await axios.get(`${baseUrl}/orders`, {
    headers: {
      authToken,
    },
  });

export const changeOrderStatus = async (
  orderId: string,
  orderStatus: string,
  authToken: string
) =>
  await axios.put(
    `${baseUrl}/orders/change-status`,
    { orderId, orderStatus },
    {
      headers: {
        authToken,
      },
    }
  );
