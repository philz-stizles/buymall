import { Category } from './category';

export interface Product {
  id: string;
  title: string;
  slug: string;
  price: number;
  description: string;
  imageSrc?: string;
  images?: string[];
  category?: Category;
  isPublished?: boolean;
  createdAt?: string;
  createdBy?: string;
}
