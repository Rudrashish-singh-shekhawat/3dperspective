// src/engine/interaction/Pointer.js
import { useEffect, useCallback, useRef } from 'react';

/**
 * Unified pointer abstraction that normalises mouse and single‑touch events.
 * Provides:
 *   - onPointerDown(clientX, clientY, button, shift)
 *   - onPointerMove(clientX, clientY, shift)
 *   - onPointerUp(clientX, clientY, button)
 *
 * Original code duplicated logic for mouse and touch; this centralises it.
 */
export function usePointer(canvasRef, handlers) {
  const { onPointerDown, onPointerMove, onPointerUp } = handlers;
  const isTouchActiveRef = useRef(false);

  const getCanvasPos = useCallback((e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: e.clientX, y: e.clientY };
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }, [canvasRef]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Mouse
    const onMouseDown = (e) => {
      if (!isTouchActiveRef.current) {
        onPointerDown && onPointerDown(e.clientX, e.clientY, e.button, e.shiftKey);
      }
    };
    const onMouseMove = (e) => {
      if (!isTouchActiveRef.current) {
        onPointerMove && onPointerMove(e.clientX, e.clientY, e.shiftKey);
      }
    };
    const onMouseUp = (e) => {
      if (!isTouchActiveRef.current) {
        onPointerUp && onPointerUp(e.clientX, e.clientY, e.button);
      }
    };

    // Touch (single finger only)
    const onTouchStart = (e) => {
      if (e.touches.length === 1) {
        isTouchActiveRef.current = true;
        const t = e.touches[0];
        onPointerDown && onPointerDown(t.clientX, t.clientY, 0, false);
        e.preventDefault();
      }
    };
    const onTouchMove = (e) => {
      if (e.touches.length === 1 && isTouchActiveRef.current) {
        const t = e.touches[0];
        onPointerMove && onPointerMove(t.clientX, t.clientY, false);
        e.preventDefault();
      }
    };
    const onTouchEnd = (e) => {
      if (isTouchActiveRef.current) {
        const t = e.changedTouches[0];
        onPointerUp && onPointerUp(t.clientX, t.clientY, 0);
        isTouchActiveRef.current = false;
      }
    };

    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('touchstart', onTouchStart, { passive: false });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd);

    return () => {
      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [canvasRef, onPointerDown, onPointerMove, onPointerUp]);
}