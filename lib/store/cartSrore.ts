import { Size } from '@/types/good';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CartItem = {
  goodId: string;
  name: string;
  rate: number;
  reviewsNumber: number;
  price: number;
  amount: number;
  size: Size;
  image?: string;
};

interface ShopStore {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (goodId: string, size: Size) => void;
  updateAmount: (goodId: string, size: Size, amount: number) => void;
  clearCart: () => void;
}

export const useShopStore = create<ShopStore>()(persist(set => ({
  cartItems: [],
  addToCart: item => set(state => {
  const existingItem = state.cartItems.find(
    cartItem => cartItem.goodId === item.goodId && cartItem.size === item.size
  );

  if (existingItem) {
    return {
      cartItems: state.cartItems.map(cartItem =>
        cartItem.goodId === item.goodId && cartItem.size === item.size
          ? { ...cartItem, amount: cartItem.amount + item.amount }
          : cartItem
      )
    };
  }

    return { cartItems: [...state.cartItems, item] };
  }),
  removeFromCart: (goodId, size) =>
    set(state => ({
      cartItems: state.cartItems.filter(i => !(i.goodId === goodId && i.size === size)),
    })),
  updateAmount: (goodId, size, amount) =>
    set(state => ({
      cartItems: state.cartItems.map(i => 
        i.goodId === goodId && i.size === size ? { ...i, amount } : i
      ),
    })),
  clearCart: () => set({ cartItems: [] }), }),
  {
    name: 'shop-cart',
    partialize: state => ({ cartItems: state.cartItems }),
  }
),);
