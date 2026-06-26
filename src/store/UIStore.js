// src/store/UIStore.js
import { create } from 'zustand';

/**
 * Global UI state store.
 * Manages sidebar, bottom panel, and other UI toggles.
 */
export const useUIStore = create((set) => ({
  sidebarOpen: true,
  bottomPanelOpen: false,
  leftBpSidebarOpen: true,
  rightBpSidebarOpen: true,
  panelHeight: typeof window !== 'undefined' ? window.innerHeight * 0.25 : 300,

  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),

  toggleBottomPanel: () => set((s) => ({ bottomPanelOpen: !s.bottomPanelOpen })),
  setBottomPanelOpen: (open) => set({ bottomPanelOpen: open }),

  toggleLeftBpSidebar: () => set((s) => ({ leftBpSidebarOpen: !s.leftBpSidebarOpen })),
  toggleRightBpSidebar: () => set((s) => ({ rightBpSidebarOpen: !s.rightBpSidebarOpen })),

  setPanelHeight: (height) => set({ panelHeight: height }),
}));