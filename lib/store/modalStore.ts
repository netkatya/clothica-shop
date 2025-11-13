import { create } from 'zustand';

interface ModalState {
  basketOpen: boolean;
  openBasket: () => void;
  closeBasket: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  basketOpen: false,
  openBasket: () => set({ basketOpen: true }),
  closeBasket: () => set({ basketOpen: false }),
}));
