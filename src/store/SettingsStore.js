// src/store/SettingsStore.js
import { create } from 'zustand';

/**
 * Persistent settings store.
 * Stores user preferences that may be saved across sessions.
 * For now it holds the default animation speed and grid visibility,
 * but can be extended for other settings (e.g. colour schemes, UI density).
 */
export const useSettingsStore = create((set) => ({
  // Animation settings
  defaultSpeed: 20,          // slider value 1–100, maps to speed/1000
  gridVisible: true,
  axisLabelsVisible: true,

  setDefaultSpeed: (speed) => set({ defaultSpeed: speed }),
  toggleGrid: () => set((s) => ({ gridVisible: !s.gridVisible })),
  toggleAxisLabels: () => set((s) => ({ axisLabelsVisible: !s.axisLabelsVisible })),
}));