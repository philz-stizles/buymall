export interface User {
  id: string;
  name: string;
  firstname?: string;
  lastname?: string;
  bio?: string;
  avatar?: string;
  email: string;
  phone?: string;
  address?: string;
  isActive?: boolean;
  roles?: string[];
  createdAt?: string;
  createdBy?: string;
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
  tokens?: {
    access: Token;
    refresh: Token;
  };
  user?: User;
}
