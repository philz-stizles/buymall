import axios from 'axios';
import { baseUrl } from '../constants';
import {   ProductModel } from '../types';

export const createProduct = async (product: any, authToken: string) =>
  await axios.post(`${baseUrl}/products`, product, {
    headers: {
      authToken,
    },
  });

export const upload = async (uri: string, authToken: string) =>
  await axios.post(
    `${baseUrl}/products/upload`,
    { image: uri },
    { headers: { authToken } }
  );

export const removeImage = async (public_id: string, authToken: string) =>
  await axios.post(
    `${baseUrl}/products/remove-file`,
    { public_id },
    { headers: { authToken } }
  );

export const getProductsByLimit = async (limit: number) =>
  await axios.get(`${baseUrl}/products?limit=${limit}`);

export const removeProduct = async (slug: string, authToken: string) =>
  await axios.delete(`${baseUrl}/products/${slug}`, {
    headers: { authToken },
  });

export const getProduct = async (slug: string) =>
  await axios.get(`${baseUrl}/products/${slug}`);

export const updateProduct = async (
  slug: string,
  product: ProductModel,
  authToken: string
) =>
  await axios.put(`${baseUrl}/products/${slug}`, product, {
    headers: { authToken },
  });

export const getProducts = async (sort?: string, order?: string, page?: number) =>
  await axios.post(`${baseUrl}/products/filtered`, {
    sort,
    order,
    page,
  });

export const getProductsTotal = async () =>
  await axios.get(`${baseUrl}/products/total`);

export const setProductRating = async (
  productId: string,
  star: number,
  authToken: string
) =>
  await axios.put(
    `${baseUrl}/products/${productId}/set-rating`,
    { star },
    { headers: { authToken } }
  );

export const getRelatedProducts = async (productId: string) =>
  await axios.get(`${baseUrl}/products/${productId}/related`);

export const getProductsBySearch = async (arg: object) =>
  await axios.post(`${baseUrl}/products/search/filters`, arg);
