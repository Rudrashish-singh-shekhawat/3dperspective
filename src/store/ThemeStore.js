// src/store/ThemeStore.js
import { create } from 'zustand';

/**
 * Manages the application theme.
 * Currently only "dark" is implemented, but the store allows for future "light" support.
 */
export const useThemeStore = create((set) => ({
  theme: 'dark',

  setTheme: (theme) => set({ theme }),
  toggleTheme: () =>
    set((s) => ({ theme: s.theme === 'dark' ? 'light' : 'dark' })),
}));