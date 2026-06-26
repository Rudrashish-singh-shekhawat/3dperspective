// src/store/ShortcutStore.js
import { create } from 'zustand';

/**
 * Global keyboard shortcut registry.
 * Stores a map of shortcut keys to actions.
 * Components can register/unregister shortcuts dynamically.
 */
export const useShortcutStore = create((set, get) => ({
  shortcuts: {}, // { [keyCombo]: handler }

  register: (keyCombo, handler) =>
    set((state) => ({
      shortcuts: { ...state.shortcuts, [keyCombo]: handler },
    })),

  unregister: (keyCombo) =>
    set((state) => {
      const next = { ...state.shortcuts };
      delete next[keyCombo];
      return { shortcuts: next };
    }),

  handleKeyDown: (event) => {
    const shortcuts = get().shortcuts;
    // Build key descriptor matching what useShortcuts hook generates
    let key = event.key;
    if (event.shiftKey && key !== 'Shift') key = 'Shift+' + key;
    if (event.ctrlKey) key = 'Ctrl+' + key;
    if (event.altKey) key = 'Alt+' + key;
    if (event.metaKey) key = 'Meta+' + key;
    // Also allow single character matching (lowercase)
    const matchKey = key.length === 1 ? key.toLowerCase() : key;
    if (shortcuts[matchKey]) {
      shortcuts[matchKey](event);
    }
  },
}));