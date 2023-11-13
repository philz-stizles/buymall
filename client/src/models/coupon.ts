export interface Coupon {
  id: string;
  name: string;
  description: string;
  expiry: string;
  discount: number;
  isPublished: boolean;
  createdAt?: string;
  createdBy?: string;
}