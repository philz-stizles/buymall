import { ReactElement } from 'react';

export interface ColumnProps<T> {
  key: string;
  title: string | ReactElement;
  render?: (column: ColumnProps<T>, item: T) => ReactElement;
}

export interface IFileUpload {
  public_id?: string;
  id: string;
  url: string;
}

export interface ReadOnlyURLSearchParams extends URLSearchParams {
  append: never;
  set: never;
  delete: never;
  sort: never;
}

export enum RoleType {
  ADMIN = 'admin',
  CUSTOMER = 'Customer',
  VENDOR = 'vendor',
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

export type Paged<T> = {
  count: number;
  data: T[];
};
