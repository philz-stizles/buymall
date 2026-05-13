/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useReducer,
} from 'react';
import { Cart } from '../models/cart';
import { Product } from '../models/product';

const ADD_ITEM = 'ADD_ITEM';
const REMOVE_ITEM = 'REMOVE_ITEM';
const CLEAR = 'CLEAR';

type ActionType = { type: string; payload?: any };

type StateType = Cart;

type CartContextType = {
  cart: Cart;
  addItem: (item: Product) => void;
  removeItem: (id: string) => void;
  clear: () => void;
};

const initCart = {
  items: [],
  totalPrice: 0,
  totalQuantity: 0,
};

export const CartContext = createContext<CartContextType>({
  cart: initCart,
  addItem: (item: Product) => {},
  removeItem: (id: string) => {},
  clear: () => {},
});

const cartReducer = (state: StateType, action: ActionType) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_ITEM: {
      const { items, totalPrice, totalQuantity } = state;
      const targetIndex = items.findIndex((item) => item.id === payload.id);
      let updatedItems = [...items];
      let newTotalPrice = totalPrice;
      let newTotalQuantity = totalQuantity;
      if (targetIndex === -1) {
        updatedItems.push({ ...payload, quantity: 1 });
        newTotalPrice += payload.price;
        newTotalQuantity += 1;
      } else {
        const targetItem = items[targetIndex];
        const updatedItem = {
          ...targetItem,
          quantity: targetItem.quantity + 1,
        };
        updatedItems[targetIndex] = updatedItem;
        newTotalPrice += payload.price;
      }
      return {
        ...state,
        items: updatedItems,
        totalPrice: newTotalPrice,
        totalQuantity: newTotalQuantity,
      };
    }
    case REMOVE_ITEM: {
      let { items, totalPrice, totalQuantity } = state;
      const targetIndex = items.findIndex((item) => item.id === payload);
      if (targetIndex === -1) {
        return state;
      } else {
        const targetItem = items[targetIndex];
        const updatedItems = [...items];
        if (targetItem.quantity === 1) {
          updatedItems.splice(targetIndex, 1);
          totalPrice -= targetItem.price;
          totalQuantity -= totalQuantity;
        } else {
          updatedItems[targetIndex] = {
            ...targetItem,
            quantity: targetItem.quantity - 1,
          };
        }
        return {
          ...state,
          items: updatedItems,
          totalPrice,
          totalQuantity,
        };
      }
    }
    case CLEAR: {
      return { ...state, items: [], totalPrice: 0, totalQuantity: 0 };
    }
    default:
      return state;
  }
};

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [cart, dispatch] = useReducer(cartReducer, initCart, () => {
    if (typeof window !== 'undefined') {
      const cart = localStorage.getItem('cart');
      if (cart) {
        return JSON.parse(cart);
      } else {
        return initCart;
      }
    }
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]);

  const addItem = useCallback((item: Product) => {
    dispatch({ type: ADD_ITEM, payload: item });
  }, []);

  const removeItem = useCallback((id: string) => {
    dispatch({ type: REMOVE_ITEM, payload: id });
  }, []);

  const clear = useCallback(() => {
    dispatch({ type: CLEAR });
  }, []);

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, clear }}>
      {children}
    </CartContext.Provider>
  );
};
