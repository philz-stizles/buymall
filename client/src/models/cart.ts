import { Product } from './product';

export interface Cart {
  items: CartProduct[];
  totalQuantity: number;
  totalPrice: number;
}

export type CartProduct = Product & {
  quantity: number;
};
