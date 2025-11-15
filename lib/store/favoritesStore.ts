import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoriteState {
  favorites: string[];
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  toggleFavorite: (id: string) => void;
}

export const useFavoritesStore = create<FavoriteState>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: id => set({ favorites: [...get().favorites, id] }),
      removeFavorite: id =>
        set({ favorites: get().favorites.filter(favId => favId !== id) }),
      toggleFavorite: id =>
        set({
          favorites: get().favorites.includes(id)
            ? get().favorites.filter(favId => favId !== id)
            : [...get().favorites, id],
        }),
    }),
    {
      name: 'favorites-storage',
    }
  )
);
