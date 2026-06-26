// src/features/fourier/math/EpicycleMath.js

/**
 * Pure utility functions for epicycle calculations.
 * These replicate the core math used in the original rendering:
 * summing the contributions of all circles to get the pen position.
 */

/**
 * Compute the endpoint (x, y) of the epicycle chain at a given time.
 * The original code in `drawEpicycles` uses nested coordinates:
 *   cx = 0, cy = 0;
 *   for each circle: angle = (time * freq + phase)
 *                    cx += radius * cos(angle)
 *                    cy += radius * sin(angle)
 * This function mirrors that exactly.
 *
 * @param {Array<{radius: number, freq: number, phase: number}>} circles
 * @param {number} time - Current animation time.
 * @returns {{x: number, y: number}} The final pen position.
 */
export function computeEndpoint(circles, time) {
  let x = 0, y = 0;
  for (let i = 0; i < circles.length; i++) {
    const { radius, freq, phase } = circles[i];
    const angle = (time * freq + phase);
    x += radius * Math.cos(angle);
    y += radius * Math.sin(angle);
  }
  return { x, y };
}

/**
 * Computes the complete chain of segments for all epicycles.
 * Each segment includes start and end world coordinates,
 * plus the circle parameters for rendering.
 *
 * @param {Array<{radius: number, freq: number, phase: number}>} circles
 * @param {number} time
 * @returns {Array<{start: {x:number, y:number}, end: {x:number, y:number}, radius: number, freq: number, phase: number}>}
 */
export function computeChain(circles, time) {
  const segments = [];
  let cx = 0, cy = 0;
  for (let i = 0; i < circles.length; i++) {
    const { radius, freq, phase } = circles[i];
    const angle = (time * freq + phase);
    const nx = cx + radius * Math.cos(angle);
    const ny = cy + radius * Math.sin(angle);
    segments.push({
      start: { x: cx, y: cy },
      end: { x: nx, y: ny },
      radius,
      freq,
      phase
    });
    cx = nx;
    cy = ny;
  }
  return segments;
}