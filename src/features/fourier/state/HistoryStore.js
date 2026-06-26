// src/features/fourier/state/HistoryStore.js
import { create } from 'zustand';

/**
 * Manages undo/redo history for circles changes.
 * Each snapshot stores a deep copy of the circles array.
 * The original code had no undo, but this follows the project spec.
 */
export const useHistoryStore = create((set, get) => ({
  undoStack: [],
  redoStack: [],

  pushSnapshot: (circles) =>
    set((state) => ({
      undoStack: [...state.undoStack, JSON.parse(JSON.stringify(circles))],
      redoStack: [], // clear redo on new action
    })),

  undo: () => {
    const { undoStack, redoStack } = get();
    if (undoStack.length === 0) return null;
    const previous = undoStack[undoStack.length - 1];
    const current = get().circles; // assume you store current circles somewhere or pass it
    set({
      undoStack: undoStack.slice(0, -1),
      redoStack: [...redoStack, JSON.parse(JSON.stringify(current))],
    });
    return previous; // caller must apply this to circles
  },

  redo: () => {
    const { undoStack, redoStack } = get();
    if (redoStack.length === 0) return null;
    const next = redoStack[redoStack.length - 1];
    const current = get().circles;
    set({
      redoStack: redoStack.slice(0, -1),
      undoStack: [...undoStack, JSON.parse(JSON.stringify(current))],
    });
    return next; // caller must apply this to circles
  },

  clear: () => set({ undoStack: [], redoStack: [] }),
}));