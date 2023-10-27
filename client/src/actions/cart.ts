import axios from 'axios';
import { baseUrl } from '../constants';

export const addUserCart = async (cart: any, authToken: string) =>
  await axios.post(`${baseUrl}/carts`, { cart }, { headers: { authToken } });

export const getUserCart = async (authToken: string) =>
  await axios.get(`${baseUrl}/carts`, { headers: { authToken } });

export const emptyUserCart = async (authToken: string) =>
  await axios.delete(`${baseUrl}/carts`, { headers: { authToken } });

export const applyCoupon = async (coupon: any, authToken: string) =>
  await axios.post(
    `${baseUrl}/carts/coupon`,
    { coupon },
    { headers: { authToken } }
  );
