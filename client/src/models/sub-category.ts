export interface SubCategory {
  id: string;
  name: string;
  description: string;
  isPublished: boolean;
  category?: string;
  createdAt?: string;
  createdBy?: string;
}