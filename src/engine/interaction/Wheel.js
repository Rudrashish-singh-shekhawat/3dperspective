// src/engine/interaction/Wheel.js
import { useEffect } from 'react';

/**
 * Hook that binds the wheel event to a zoom handler.
 * Original: canvas.addEventListener("wheel", (e) => { e.preventDefault(); scale *= ... }, { passive: false });
 */
export function useWheel(canvasRef, onZoom) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleWheel = (e) => {
      e.preventDefault();
      const delta = e.deltaY < 0 ? 1 : -1;
      onZoom(delta);
    };

    canvas.addEventListener('wheel', handleWheel, { passive: false });
    return () => canvas.removeEventListener('wheel', handleWheel);
  }, [canvasRef, onZoom]);
}