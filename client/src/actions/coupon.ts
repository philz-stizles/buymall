import axios from 'axios';
import { baseUrl } from '../constants';

export const createCoupon = async (data: any, authToken: string) =>
  await axios.post(`${baseUrl}/coupons`, data, {
    headers: {
      authToken,
    },
  });

export const getCoupons = async () => await axios.get(`${baseUrl}/coupons`);

export const removeCoupon = async (id: string, authToken: string) => {
  return await axios.delete(`${baseUrl}/coupons/${id}`, {
    headers: { authToken },
  });
};
