import { baseUrl } from '../utils/constants';
import axios from 'axios';

export const saveUserAddress = async (authToken: string, address: string) =>
  await axios.post(
    `${baseUrl}/users/address`,
    { address },
    { headers: { authToken } }
  );

export const addToUserWishlist = async (productId: string, authToken: string) =>
  await axios.post(
    `${baseUrl}/users/wishlist`,
    { productId },
    { headers: { authToken } }
  );

export const getUserWishlist = async (authToken: string) =>
  await axios.get(`${baseUrl}/users/wishlist`, { headers: { authToken } });

export const removeFromUserWishlist = async (
  productId: string,
  authToken: string
) =>
  await axios.put(
    `${baseUrl}/users/wishlist/${productId}`,
    {},
    { headers: { authToken } }
  );
