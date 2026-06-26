// src/engine/hooks/useResize.js
import { useEffect, useCallback } from 'react';

/**
 * Hook that handles resize of the main canvas (and optionally a graph canvas)
 * to fill the viewport. It takes refs to the canvas elements and a viewport
 * element (the container). In the original code, resize() was called on window
 * resize and at initialisation.
 */
export function useResize(canvasRef, graphCanvasRef, viewportRef) {
  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    const viewport = viewportRef?.current || canvas?.parentElement;
    if (!canvas || !viewport) return;

    canvas.width = viewport.clientWidth;
    canvas.height = viewport.clientHeight;

    // Also resize graph canvas if provided
    if (graphCanvasRef?.current) {
      const graphCanvas = graphCanvasRef.current;
      const parent = graphCanvas.parentElement;
      if (parent) {
        if (graphCanvas.width !== parent.clientWidth || graphCanvas.height !== parent.clientHeight) {
          graphCanvas.width = parent.clientWidth;
          graphCanvas.height = parent.clientHeight;
        }
      }
    }
  }, [canvasRef, graphCanvasRef, viewportRef]);

  useEffect(() => {
    resize();
    
    let observer;
    const viewport = viewportRef?.current || canvasRef.current?.parentElement;
    
    if (viewport) {
      observer = new ResizeObserver(() => {
        resize();
      });
      observer.observe(viewport);
    } else {
      window.addEventListener('resize', resize);
    }
    
    return () => {
      if (observer && viewport) {
        observer.unobserve(viewport);
        observer.disconnect();
      } else {
        window.removeEventListener('resize', resize);
      }
    };
  }, [resize, viewportRef, canvasRef]);

  return resize;
}