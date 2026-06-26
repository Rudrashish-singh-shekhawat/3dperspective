// src/engine/interaction/Mouse.js
import { useEffect, useState, useCallback } from 'react';

/**
 * Hook that tracks mouse position, button state, and provides a
 * unified interface for pointer-like events relative to a canvas.
 *
 * Original code had scattered tracking of `lastMouseX`, `lastMouseY`,
 * `dragStartX`, `dragStartY`, and button checks. This centralises them.
 */
export function useMouse(canvasRef) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [buttons, setButtons] = useState(0);
  const [isDown, setIsDown] = useState(false);

  // Convert event to canvas-relative coordinates
  const toCanvasCoords = useCallback((clientX, clientY) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: clientX, y: clientY };
    const rect = canvas.getBoundingClientRect();
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  }, [canvasRef]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseMove = (e) => {
      const coords = toCanvasCoords(e.clientX, e.clientY);
      setPos(coords);
    };

    const handleMouseDown = (e) => {
      const coords = toCanvasCoords(e.clientX, e.clientY);
      setPos(coords);
      setButtons(e.buttons);
      setIsDown(true);
    };

    const handleMouseUp = (e) => {
      const coords = toCanvasCoords(e.clientX, e.clientY);
      setPos(coords);
      setButtons(e.buttons);
      setIsDown(false);
    };

    // Bind to canvas element
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp); // catch releases outside

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [canvasRef, toCanvasCoords]);

  return { ...pos, buttons, isDown };
}