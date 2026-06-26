// src/engine/interaction/Shortcut.js
import { useEffect } from 'react';

/**
 * Hook that registers global keyboard shortcuts.
 * Pass an object mapping key (e.g. '1', 'r', 'Shift+Left') to a handler.
 * The handler receives the original KeyboardEvent.
 * The original code maps keys 1-6 to axis snaps and R to reset,
 * and Shift is tracked separately. This centralises all bindings.
 */
export function useShortcuts(shortcutMap) {
  useEffect(() => {
    const handler = (e) => {
      // Build a key descriptor: e.g. 'Shift+a' or just 'a'
      let key = e.key;
      if (e.shiftKey && key !== 'Shift') key = 'Shift+' + key;
      if (e.ctrlKey) key = 'Ctrl+' + key;
      if (e.altKey) key = 'Alt+' + key;
      if (e.metaKey) key = 'Meta+' + key;

      // Also support lowercased single chars for convenience
      const matchKey = key.length === 1 ? key.toLowerCase() : key;
      if (shortcutMap[matchKey]) {
        shortcutMap[matchKey](e);
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [shortcutMap]);
}