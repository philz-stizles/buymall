export interface ReadOnlyURLSearchParams extends URLSearchParams {
  append: never;
  set: never;
  delete: never;
  sort: never;
}

export enum RoleType {
  ADMIN = 'admin',
  TALENT = 'talent',
  COMPANY = 'company',
}

export interface User {
  email: string;
  name: string;
  role: RoleType;
}

export interface Skill {
  name: string;
}

export interface Job {
  title: string;
  description: string;
}

export interface TechStack {
  id: string;
  name: string;
  description: string;
}

export interface Technology {
  name: string;
  description: string;
}

export interface Profile {
  bio: string;
  email: string;
  phone: string;
  socialLinks: string[];
  skills: Skill[];
}
export type Size = 'sm' | 'md' | 'lg';

export type Variant =
  | 'white'
  | 'black'
  | 'success'
  | 'danger'
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'flat'
  | 'outlined';
