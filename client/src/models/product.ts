import { IFileUpload } from '../types';
import { Category } from './category';
import { Rating } from './rating';

export interface Product {
  id: string;
  title: string;
  slug: string;
  price: number;
  description: string;
  imageSrc?: string;
  images?: IFileUpload[];
  ratings: Rating[];
  category?: Category;
  isPublished?: boolean;
  createdAt?: string;
  createdBy?: string;
}
