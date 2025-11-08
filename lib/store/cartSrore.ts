import { create } from 'zustand';

export type CartItem = {
  goodId: string;
  name: string;
  rate: number;
  reviewsNumber: number;
  price: number;
  quantity: number;
  image?: string;
};

interface ShopStore {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

export const useShopStore = create<ShopStore>(set => ({
  cartItems: [],
  addToCart: item => set(state => ({ cartItems: [...state.cartItems, item] })),
  removeFromCart: goodId =>
    set(state => ({
      cartItems: state.cartItems.filter(i => i.goodId !== goodId),
    })),
  clearCart: () => set({ cartItems: [] }),
}));
