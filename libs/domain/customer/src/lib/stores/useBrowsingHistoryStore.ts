import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Store for managing customer browsing history
 * Persists to localStorage with key 'browsing-history'
 * Maintains a maximum of 50 most recent items
 * Supports tracking both products and stores
 */
export interface BrowsingHistoryItem {
  id: string;
  type: 'product' | 'store';
  name: string;
  slug?: string;
  image?: string;
  timestamp: number;
}

interface BrowsingHistoryState {
  history: BrowsingHistoryItem[];
  addItem: (item: Omit<BrowsingHistoryItem, 'timestamp'>) => void;
  addToHistory: (productId: string, productName?: string) => void;
  removeItem: (id: string) => void;
  getHistory: () => BrowsingHistoryItem[];
  clearHistory: () => void;
}

const MAX_HISTORY_ITEMS = 50;

export const useBrowsingHistoryStore = create<BrowsingHistoryState>()(
  persist(
    (set, get) => ({
      history: [],

      addItem: (item: Omit<BrowsingHistoryItem, 'timestamp'>) => {
        set((state) => {
          // Remove any existing entry for this item to prevent duplicates
          const filteredHistory = state.history.filter(
            (historyItem) => historyItem.id !== item.id
          );

          // Add new entry at the beginning with timestamp
          const newHistory = [
            {
              ...item,
              timestamp: Date.now(),
            },
            ...filteredHistory,
          ];

          // Limit to max items
          return {
            history: newHistory.slice(0, MAX_HISTORY_ITEMS),
          };
        });
      },

      addToHistory: (productId: string, productName?: string) => {
        // Legacy method for backward compatibility
        set((state) => {
          const filteredHistory = state.history.filter(
            (item) => item.id !== productId
          );

          const newHistory = [
            {
              id: productId,
              type: 'product' as const,
              name: productName || '',
              timestamp: Date.now(),
            },
            ...filteredHistory,
          ];

          return {
            history: newHistory.slice(0, MAX_HISTORY_ITEMS),
          };
        });
      },

      removeItem: (id: string) => {
        set((state) => ({
          history: state.history.filter((item) => item.id !== id),
        }));
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
