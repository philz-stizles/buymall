import axios from 'axios';
import { baseUrl } from '../constants';

const endpoint = 'categories';

export const createCategory = async (data: any, authToken: string) => {
  return await axios.post(`${baseUrl}/${endpoint}`, data, {
    headers: { authToken },
  });
};

export const getCategories = async () => {
  const response = await axios.get(`${baseUrl}/${endpoint}`);
  return response.data;
};

export const getCategory = async (slug: string) => {
  return await axios.get(`${baseUrl}/${endpoint}/${slug}`);
};

export const updateCategory = async (
  slug: string,
  data: any,
  authToken: string
) => {
  return await axios.put(`${baseUrl}/${endpoint}/${slug}`, data, {
    headers: { authToken },
  });
};

export const removeCategory = async (slug: string, authToken: string) => {
  return await axios.delete(`${baseUrl}/${endpoint}/${slug}`, {
    headers: { authToken },
  });
};

export const getCategorySubs = async (_id: string) =>
  await axios.get(`${baseUrl}/${endpoint}/${_id}/subs`);
