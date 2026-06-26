// src/engine/canvas/RenderLoop.js
import { useRef, useEffect, useCallback } from 'react';

/**
 * A render loop hook that drives the animation frame.
 * Calls onUpdate every frame (with delta time in ms), and onDraw after.
 * Only updates when isPlaying is true.
 */
export function useRenderLoop(isPlaying, onUpdate, onDraw) {
  const rafRef = useRef(null);
  const lastTimeRef = useRef(0);

  const loop = useCallback((timestamp) => {
    if (!lastTimeRef.current) lastTimeRef.current = timestamp;
    const dt = timestamp - lastTimeRef.current;
    lastTimeRef.current = timestamp;

    if (isPlaying) {
      onUpdate(dt);
    }
    onDraw();

    rafRef.current = requestAnimationFrame(loop);
  }, [isPlaying, onUpdate, onDraw]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [loop]);
}