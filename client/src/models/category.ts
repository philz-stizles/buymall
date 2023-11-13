import { IFileUpload } from '../types';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  isPublished: boolean;
  subCategories: string[];
  image?: IFileUpload;
  createdAt?: string;
  createdBy?: string;
}

