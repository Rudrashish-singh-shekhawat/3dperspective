// src/engine/animation/Tween.js

/**
 * Simple linear interpolation and easing utilities.
 * Used for animations (e.g. snapping, UI transitions).
 * Original code uses slerp for camera, but no generic tween.
 */
export function lerp(a, b, t) {
  return a + (b - a) * t;
}

export function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function easeOutElastic(t) {
  if (t === 0 || t === 1) return t;
  return Math.pow(2, -10 * t) * Math.sin((t - 1) * (2 * Math.PI) / 0.3) + 1;
}