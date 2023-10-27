import axios from 'axios';
import { baseUrl } from '../constants';

export const createSubCategory = async (data: any, authToken: string) => {
  return await axios.post(`${baseUrl}/sub-categories`, data, {
    headers: { authToken },
  });
};

export const getSubCategories = async () =>
  await axios.get(`${baseUrl}/sub-categories`);

export const getSubCategory = async (slug: string) => {
  return await axios.get(`${baseUrl}/sub-categories/${slug}`);
};

export const updateSubCategory = async (
  slug: string,
  data: any,
  authToken: string
) => {
  return await axios.put(`${baseUrl}/sub-categories/${slug}`, data, {
    headers: { authToken },
  });
};

export const removeSubCategory = async (slug: string, authToken: string) => {
  return await axios.delete(`${baseUrl}/sub-categories/${slug}`, {
    headers: { authToken },
  });
};
