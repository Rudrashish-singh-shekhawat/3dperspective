// src/engine/animation/AnimationLoop.js
import { useEffect, useRef } from 'react';

/**
 * Drives a continuous requestAnimationFrame loop.
 * The loop always runs (like the original animate function),
 * but the `onFrame` callback receives the delta time and a boolean `isPlaying`.
 * The consumer decides whether to advance time or just redraw.
 */
export function useAnimationLoop(onFrame) {
  const rafRef = useRef(null);
  const lastTimeRef = useRef(0);

  useEffect(() => {
    const loop = (timestamp) => {
      rafRef.current = requestAnimationFrame(loop);
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const dt = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;
      onFrame(dt);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [onFrame]);
}