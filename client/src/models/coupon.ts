export interface Coupon {
  id: string;
  name: string;
  description: string;
  expiry: string;
  discount: number;
  createdAt?: string;
  createdBy?: string;
}