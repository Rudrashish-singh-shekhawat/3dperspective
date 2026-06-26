// src/features/fourier/hooks/useFourier.js
import { useFourierStore } from '../state/FourierStore';
import { useAnimationStore } from '../state/AnimationStore';
import { computeEpicyclePoint } from '../math/FourierSeries';

/**
 * High‑level hook for the Fourier feature.
 * Provides circles, path, equation, and convenience actions.
 */
export function useFourier() {
  const circles = useFourierStore((s) => s.circles);
  const path = useFourierStore((s) => s.path);
  const addCircle = useFourierStore((s) => s.addCircle);
  const removeCircle = useFourierStore((s) => s.removeCircle);
  const updateCircle = useFourierStore((s) => s.updateCircle);
  const clearAll = useFourierStore((s) => s.clearAll);
  const setCircles = useFourierStore((s) => s.setCircles);
  const time = useAnimationStore((s) => s.time);

  // Current pen endpoint (for stats or overlays)
  const endpoint = computeEpicyclePoint(circles, time);

  return {
    circles,
    path,
    time,
    endpoint,
    addCircle,
    removeCircle,
    updateCircle,
    clearAll,
    setCircles,
  };
}