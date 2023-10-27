import axios from 'axios';
import { baseUrl } from '../constants';

export const createOrUpdateUser = async (authToken: string) => {
  return await axios.post(
    `${baseUrl}/users/create-or-update`,
    {},
    { headers: { authToken } }
  );
};

export const getCurrentUser = async (authToken: string) => {
  return await axios.get(`${baseUrl}/auth/current-user`, {
    // headers: { 'Content-type': 'application/json', authToken },
  });
};

export const getCurrentAdmin = async (authToken: string) => {
  return await axios.get(`${baseUrl}/users/current-admin`, {
    headers: { authToken },
  });
};
