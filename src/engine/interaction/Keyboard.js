// src/engine/interaction/Keyboard.js
import { useEffect, useState, useCallback } from 'react';

/**
 * Hook that tracks keyboard state, focusing on modifier keys (Shift)
 * and providing a centralized keydown handler.
 * The original code uses `e.shiftKey` on mouse events and listens for
 * keys 1–6 and R on the window.
 */
export function useKeyboard() {
  const [shiftHeld, setShiftHeld] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Shift') setShiftHeld(true);
    };
    const handleKeyUp = (e) => {
      if (e.key === 'Shift') setShiftHeld(false);
    };
    // Also reset shift when window loses focus
    const handleBlur = () => setShiftHeld(false);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('blur', handleBlur);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('blur', handleBlur);
    };
  }, []);

  // Wrapper to attach camera snap / reset bindings (used by CameraSnap hook)
  const bindCameraShortcuts = useCallback((onSnap, onReset) => {
    const handler = (e) => {
      const map = {
        '1': 'X',
        '2': 'Y',
        '3': 'Z',
        '4': '-X',
        '5': '-Y',
        '6': '-Z',
      };
      if (map[e.key]) {
        onSnap(map[e.key]);
        e.preventDefault();
      }
      if (e.key.toLowerCase() === 'r') {
        onReset();
        e.preventDefault();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return { shiftHeld, bindCameraShortcuts };
}