import { IFileUpload } from '../types';

export interface SubCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  isPublished: boolean;
  category?: string;
  image?: IFileUpload;
  createdAt?: string;
  createdBy?: string;
}
