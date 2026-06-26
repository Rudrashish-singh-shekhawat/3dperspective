// src/hooks/useShortcut.js
import { useEffect } from 'react';
import { useShortcutStore } from '../store/ShortcutStore';

/**
 * Registers a keyboard shortcut while the component is mounted.
 *
 * @param {string} keyCombo - Key combo string (e.g. 'r', 'Shift+1', 'Ctrl+z').
 * @param {function} handler - Callback function to invoke when the shortcut is pressed.
 * @param {boolean} [active=true] - Whether the shortcut should be active.
 */
export function useShortcut(keyCombo, handler, active = true) {
  const register = useShortcutStore((s) => s.register);
  const unregister = useShortcutStore((s) => s.unregister);

  useEffect(() => {
    if (!active) return;

    register(keyCombo, handler);
    return () => unregister(keyCombo);
  }, [keyCombo, handler, active, register, unregister]);
}