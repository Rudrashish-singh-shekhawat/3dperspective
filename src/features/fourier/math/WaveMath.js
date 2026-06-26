// src/features/fourier/math/WaveMath.js

/**
 * Computes the maximum amplitude in the path for both X and Y components.
 * Used to determine scaling factors for the oscilloscope and 2D shape views.
 * Replicates the amplitude‑finding logic in the original draw2DGraph().
 *
 * @param {Array<{x: number, y: number}>} path - path points (most recent first)
 * @returns {{ maxAmp: number, maxX: number, maxY: number }}
 */
export function getPathAmplitude(path) {
  let maxAmp = 0.001; // avoid division by zero
  let maxX = 0;
  let maxY = 0;

  for (let i = 0; i < path.length; i++) {
    const ax = Math.abs(path[i].x);
    const ay = Math.abs(path[i].y);
    if (ax > maxX) maxX = ax;
    if (ay > maxY) maxY = ay;
    if (ax > maxAmp) maxAmp = ax;
    if (ay > maxAmp) maxAmp = ay;
  }

  return { maxAmp, maxX, maxY };
}