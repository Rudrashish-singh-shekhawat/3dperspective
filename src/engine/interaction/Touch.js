// src/engine/interaction/Touch.js
import { useEffect, useRef, useCallback } from 'react';

/**
 * Hook that normalizes single-touch events into pointer-like events
 * and calls the provided handlers. Original touch code:
 *   - touchstart (1 finger) → handlePointerDown
 *   - touchend (1 finger) → handlePointerUp
 *   - touchmove (1 finger) → handlePointerMove
 */
export function useTouch(canvasRef, { onPointerDown, onPointerMove, onPointerUp } = {}) {
  const activeTouchId = useRef(null);

  const getClientCoords = useCallback((touch) => {
    return { clientX: touch.clientX, clientY: touch.clientY };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleTouchStart = (e) => {
      if (e.touches.length !== 1) return;
      const touch = e.touches[0];
      activeTouchId.current = touch.identifier;
      const { clientX, clientY } = getClientCoords(touch);
      onPointerDown && onPointerDown(clientX, clientY, 0, e.target);
      e.preventDefault(); // prevent scroll
    };

    const handleTouchEnd = (e) => {
      if (activeTouchId.current === null) return;
      // Find the ended touch
      const endedTouch = Array.from(e.changedTouches).find(
        (t) => t.identifier === activeTouchId.current
      );
      if (!endedTouch) return;
      const { clientX, clientY } = getClientCoords(endedTouch);
      onPointerUp && onPointerUp(clientX, clientY, 0);
      activeTouchId.current = null;
    };

    const handleTouchMove = (e) => {
      if (activeTouchId.current === null || e.touches.length !== 1) return;
      const touch = e.touches[0];
      if (touch.identifier !== activeTouchId.current) return;
      const { clientX, clientY } = getClientCoords(touch);
      onPointerMove && onPointerMove(clientX, clientY, false); // shift not supported on touch
      e.preventDefault();
    };

    canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      canvas.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [canvasRef, onPointerDown, onPointerMove, onPointerUp, getClientCoords]);
}