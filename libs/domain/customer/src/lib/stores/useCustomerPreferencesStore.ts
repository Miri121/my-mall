import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Store for managing customer preferences
 * Persists to localStorage with key 'customer-preferences'
 * Includes language, theme, currency, and notification settings
 */
interface NotificationPreferences {
  email: boolean;
  push: boolean;
}

interface CustomerPreferencesState {
  language: 'en' | 'he';
  theme: 'light' | 'dark' | 'system';
  currency: 'USD' | 'ILS';
  notifications: NotificationPreferences;
  setLanguage: (lang: 'en' | 'he') => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  setCurrency: (currency: 'USD' | 'ILS') => void;
  updateNotifications: (
    notifications: Partial<NotificationPreferences>
  ) => void;
}

export const useCustomerPreferencesStore = create<CustomerPreferencesState>()(
  persist(
    (set) => ({
      language: 'en',
      theme: 'system',
      currency: 'USD',
      notifications: {
        email: true,
        push: true,
      },

      setLanguage: (lang: 'en' | 'he') => {
        set({ language: lang });
      },

      setTheme: (theme: 'light' | 'dark' | 'system') => {
        set({ theme });
      },

      setCurrency: (currency: 'USD' | 'ILS') => {
        set({ currency });
      },

      updateNotifications: (
        notifications: Partial<NotificationPreferences>
      ) => {
        set((state) => ({
          notifications: {
            ...state.notifications,
            ...notifications,
          },
        }));
      },
    }),
    {
      name: 'customer-preferences',
    }
  )
);
