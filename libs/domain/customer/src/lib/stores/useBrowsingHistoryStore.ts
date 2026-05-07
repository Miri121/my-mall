import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Store for managing customer browsing history
 * Persists to localStorage with key 'browsing-history'
 * Maintains a maximum of 50 most recent items
 */
interface BrowsingHistoryItem {
  productId: string;
  viewedAt: number;
  productName?: string;
}

interface BrowsingHistoryState {
  history: BrowsingHistoryItem[];
  addToHistory: (productId: string, productName?: string) => void;
  getHistory: () => BrowsingHistoryItem[];
  clearHistory: () => void;
}

const MAX_HISTORY_ITEMS = 50;

export const useBrowsingHistoryStore = create<BrowsingHistoryState>()(
  persist(
    (set, get) => ({
      history: [],

      addToHistory: (productId: string, productName?: string) => {
        set((state) => {
          // Remove any existing entry for this product to prevent duplicates
          const filteredHistory = state.history.filter(
            (item) => item.productId !== productId
          );

          // Add new entry at the beginning
          const newHistory = [
            {
              productId,
              viewedAt: Date.now(),
              productName,
            },
            ...filteredHistory,
          ];

          // Limit to max items
          return {
            history: newHistory.slice(0, MAX_HISTORY_ITEMS),
          };
        });
      },

      getHistory: () => {
        return get().history;
      },

      clearHistory: () => {
        set({ history: [] });
      },
    }),
    {
      name: 'browsing-history',
    }
  )
);
