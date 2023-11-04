import { RoleType } from '../types';

export interface User {
  id: string;
  name: string;
  firstName?: string;
  lastName?: string;
  bio?: string;
  avatar?: string;
  email: string;
  phone?: string;
  address?: string;
  isActive?: boolean;
  role: RoleType;
  createdAt?: string;
  createdBy?: string;
}

export interface Role {
  name: string;
}

export type Token = {
  token: string;
  expiresIn: string;
};

export type CurrentUser = {
  user: User;
  duration: number;
};

export interface AuthenticatedUser {
  tokens: {
    access: Token;
    refresh: Token;
  };
  user: User;
}
