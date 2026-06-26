// src/features/fourier/state/GraphStore.js
import { create } from 'zustand';

export const useGraphStore = create((set, get) => ({
  // Bottom panel open state
  isPanelOpen: false,
  // Left inner sidebar (settings) open state
  isLeftBpOpen: false,
  // Right inner sidebar (analysis) open state
  isRightBpOpen: false,
  // Ortho view open state
  isOrthoOpen: false,
  // Panel height in pixels (default 40% on mobile, 25% on desktop)
  panelHeight: typeof window !== 'undefined' ? window.innerHeight * (window.innerWidth < 768 ? 0.40 : 0.25) : 300,
  isMainSidebarOpen: false,
  toggleMainSidebar: () => set((s) => ({ isMainSidebarOpen: !s.isMainSidebarOpen })),

  togglePanel: () => set((s) => ({ isPanelOpen: !s.isPanelOpen })),
  setPanelOpen: (open) => set({ isPanelOpen: open }),

  _closeOthersAndOpen: (targetStateKey) => {
    const s = get();
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    let delay = 0;

    if (targetStateKey === 'isLeftBpOpen') {
      if (s.isRightBpOpen) { set({ isRightBpOpen: false }); delay = 300; }
      if (isMobile && s.isOrthoOpen) { set({ isOrthoOpen: false }); delay = 300; }
    } else if (targetStateKey === 'isRightBpOpen') {
      if (s.isLeftBpOpen) { set({ isLeftBpOpen: false }); delay = 300; }
      if (isMobile && s.isOrthoOpen) { set({ isOrthoOpen: false }); delay = 300; }
    } else if (targetStateKey === 'isOrthoOpen') {
      if (isMobile) {
        if (s.isLeftBpOpen) { set({ isLeftBpOpen: false }); delay = 300; }
        if (s.isRightBpOpen) { set({ isRightBpOpen: false }); delay = 300; }
      }
    }

    if (delay > 0) {
      setTimeout(() => set({ [targetStateKey]: true }), delay);
    } else {
      set({ [targetStateKey]: true });
    }
  },

  toggleLeftSidebar: () => {
    const s = get();
    if (!s.isLeftBpOpen) {
      get()._closeOthersAndOpen('isLeftBpOpen');
    } else {
      set({ isLeftBpOpen: false });
    }
  },

  toggleRightSidebar: () => {
    const s = get();
    if (!s.isRightBpOpen) {
      get()._closeOthersAndOpen('isRightBpOpen');
    } else {
      set({ isRightBpOpen: false });
    }
  },

  toggleOrtho: () => {
    const s = get();
    if (!s.isOrthoOpen) {
      get()._closeOthersAndOpen('isOrthoOpen');
    } else {
      set({ isOrthoOpen: false });
    }
  },

  setPanelHeight: (height) => set({ panelHeight: height }),
}));