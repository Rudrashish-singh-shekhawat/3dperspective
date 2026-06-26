// src/features/fourier/canvas/FourierScene.js
import { useFourierStore } from '../state/FourierStore';
import { useAnimationStore } from '../state/AnimationStore';

/**
 * The FourierScene manages the data for the epicycle scene:
 * circles, path, and time‑dependent state.
 * It provides the computed path array and an update function
 * that advances time and records path points (mirroring the original logic).
 */
export function useFourierScene() {
  const circles = useFourierStore((s) => s.circles);
  const addToPath = useFourierStore((s) => s.addToPath);
  const path = useFourierStore((s) => s.path);
  const time = useAnimationStore((s) => s.time);
  const isPlaying = useAnimationStore((s) => s.isPlaying);
  const maxPathLength = 400;

  /**
   * Advances the scene by one frame: increments time and records the
   * current pen position if the animation is playing.
   * Called from the animation loop.
   */
  const update = () => {
    if (!isPlaying) return;

    // Compute current pen position from all circles
    let cx = 0, cy = 0;
    for (let i = 0; i < circles.length; i++) {
      const r = circles[i].radius;
      const freq = circles[i].freq;
      const phase = circles[i].phase;
      const angle = (time * freq + phase);  // anti-clockwise rotation
      cx += r * Math.cos(angle);
      cy += r * Math.sin(angle);
    }

    // Prepend new path point and truncate
    addToPath({ x: cx, y: cy, t: time });
  };

  return {
    circles,
    path,
    time,
    update,
  };
}