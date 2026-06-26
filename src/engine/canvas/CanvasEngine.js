// src/engine/canvas/CanvasEngine.js
import { useRef, useEffect, useCallback } from 'react';

export function useCanvasEngine(canvasRef, graphCanvasRef, viewportRef) {
  const engineCtxRef = useRef(null);
  const graphCtxRef = useRef(null);

  const resize = useCallback(() => {
    if (!canvasRef.current || !viewportRef.current) return;
    const canvas = canvasRef.current;
    const viewport = viewportRef.current;
    canvas.width = viewport.clientWidth;
    canvas.height = viewport.clientHeight;
  }, [canvasRef, viewportRef]);

  const resizeGraph = useCallback(() => {
    if (!graphCanvasRef.current) return;
    const gCanvas = graphCanvasRef.current;
    const parent = gCanvas.parentElement;
    if (!parent) return;
    if (gCanvas.width !== parent.clientWidth || gCanvas.height !== parent.clientHeight) {
      gCanvas.width = parent.clientWidth;
      gCanvas.height = parent.clientHeight;
    }
  }, [graphCanvasRef]);

  useEffect(() => {
    if (canvasRef.current) {
      engineCtxRef.current = canvasRef.current.getContext('2d');
    }
    if (graphCanvasRef.current) {
      graphCtxRef.current = graphCanvasRef.current.getContext('2d');
    }
    resize();
    resizeGraph();

    const handleResize = () => {
      resize();
      resizeGraph();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [canvasRef, graphCanvasRef, resize, resizeGraph]);

  return {
    engineCtx: engineCtxRef.current,
    graphCtx: graphCtxRef.current,
    resize,
    resizeGraph,
  };
}