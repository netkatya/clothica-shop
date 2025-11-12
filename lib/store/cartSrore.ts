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
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

export const useShopStore = create<ShopStore>()(persist(set => ({
  cartItems: [],
  addToCart: item => set(state => ({ cartItems: [...state.cartItems, item] })),
  removeFromCart: goodId =>
    set(state => ({
      cartItems: state.cartItems.filter(i => i.goodId !== goodId),
    })),
  clearCart: () => set({ cartItems: [] }), }),
  {
    name: 'shop-cart',
    partialize: state => ({ cartItems: state.cartItems }),
  }
),);
