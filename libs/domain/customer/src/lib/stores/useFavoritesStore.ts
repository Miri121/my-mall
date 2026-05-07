import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Store for managing customer product and store favorites
 * Persists to localStorage with key 'customer-favorites'
 */
export interface FavoriteItem {
  id: string;
  name: string;
  type: 'product' | 'store';
  image?: string;
  slug?: string;
}

interface FavoritesState {
  favorites: FavoriteItem[];
  addItem: (item: FavoriteItem) => void;
  removeItem: (itemId: string) => void;
  isFavorite: (itemId: string) => boolean;
  clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],

      addItem: (item: FavoriteItem) => {
        const { favorites } = get();
        // Prevent duplicates
        if (!favorites.some((fav) => fav.id === item.id)) {
          set({ favorites: [...favorites, item] });
        }
      },

      removeItem: (itemId: string) => {
        set((state) => ({
          favorites: state.favorites.filter((item) => item.id !== itemId),
        }));
      },

      isFavorite: (itemId: string) => {
        return get().favorites.some((item) => item.id === itemId);
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
