// src/store/PreferencesStore.js
import { create } from 'zustand';

/**
 * User preferences that are saved locally (e.g., in localStorage).
 * This store persists choices like whether the bottom panel was open,
 * the last used speed, or any UI customisation.
 */
export const usePreferencesStore = create((set) => ({
  // Example preference: remember last panel state
  lastPanelOpen: false,
  lastSpeed: 20,

  setLastPanelOpen: (open) => set({ lastPanelOpen: open }),
  setLastSpeed: (speed) => set({ lastSpeed: speed }),
}));