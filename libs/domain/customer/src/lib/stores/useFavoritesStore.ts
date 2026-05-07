import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Store for managing customer product favorites
 * Persists to localStorage with key 'customer-favorites'
 */
interface FavoritesState {
  favorites: string[];
  addToFavorites: (productId: string) => void;
  removeFromFavorites: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],

      addToFavorites: (productId: string) => {
        const { favorites } = get();
        // Prevent duplicates
        if (!favorites.includes(productId)) {
          set({ favorites: [...favorites, productId] });
        }
      },

      removeFromFavorites: (productId: string) => {
        set((state) => ({
          favorites: state.favorites.filter((id) => id !== productId),
        }));
      },

      isFavorite: (productId: string) => {
        return get().favorites.includes(productId);
      },

      clearFavorites: () => {
        set({ favorites: [] });
      },
    }),
    {
      name: 'customer-favorites',
    }
  )
);
