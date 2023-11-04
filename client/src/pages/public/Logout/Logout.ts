import { redirect } from 'react-router-dom';

export const action = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  redirect('/');
  return null;
};
