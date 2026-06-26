// src/engine/hooks/useCanvas.js
import { useRef, useEffect, useCallback } from 'react';

/**
 * Hook that manages the main canvas and its 2D context.
 * Sets up the canvas ref, handles resize events, and provides
 * the canvas context for rendering.
 */
export function useCanvas() {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  const getCanvas = useCallback(() => canvasRef.current, []);
  const getCtx = useCallback(() => ctxRef.current, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctxRef.current = ctx;

    // Initial resize
    const handleResize = () => {
      if (!canvasRef.current) return;
      // Assumes the canvas is inside a container that fills available space
      const parent = canvasRef.current.parentElement;
      if (parent) {
        canvasRef.current.width = parent.clientWidth;
        canvasRef.current.height = parent.clientHeight;
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    canvasRef,
    getCanvas,
    getCtx,
  };
}