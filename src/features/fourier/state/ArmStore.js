// src/features/fourier/state/ArmStore.js
import { create } from 'zustand';

/**
 * Tracks UI‑level state for the arm list.
 * This includes which arm is currently selected (if any)
 * and whether an arm is being edited.
 * The original code does not have a selection concept,
 * but this store provides a foundation for future features
 * like keyboard navigation or batch editing.
 */
export const useArmStore = create((set) => ({
  selectedIndex: null,      // null = none selected
  editingIndex: null,       // index of arm currently in inline‑edit mode

  selectArm: (index) => set({ selectedIndex: index }),
  clearSelection: () => set({ selectedIndex: null }),

  startEditing: (index) => set({ editingIndex: index }),
  stopEditing: () => set({ editingIndex: null }),
}));