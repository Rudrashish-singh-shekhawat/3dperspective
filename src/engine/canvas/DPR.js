// src/engine/canvas/DPR.js

/**
 * Gets the device pixel ratio, capped at 2 to keep performance reasonable.
 */
export function getDPR() {
  if (typeof window === 'undefined') return 1;
  return Math.min(window.devicePixelRatio || 1, 2);
}

/**
 * Resizes a canvas to match a container's CSS size, accounting for DPR.
 * Typically called on resize.
 */
export function applyDPR(canvas, containerWidth, containerHeight, dpr = getDPR()) {
  if (!canvas) return;
  canvas.width = containerWidth * dpr;
  canvas.height = containerHeight * dpr;
  canvas.style.width = containerWidth + 'px';
  canvas.style.height = containerHeight + 'px';
}