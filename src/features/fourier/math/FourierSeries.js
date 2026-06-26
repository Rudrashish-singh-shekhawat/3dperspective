// src/features/fourier/math/FourierSeries.js

/**
 * Computes the (x, y) position of the epicycle pen at a given time.
 * Replicates the nested loop in the original rendering that sums
 * contributions from all circles.
 *
 * @param {Array} circles - array of {radius, freq, phase}
 * @param {number} time - animation time
 * @returns {{x: number, y: number}} The endpoint of the chain.
 */
export function computeEpicyclePoint(circles, time) {
  let x = 0, y = 0;
  for (let i = 0; i < circles.length; i++) {
    const { radius, freq, phase } = circles[i];
    // Angle for anti-clockwise rotation
    const angle = (time * freq + phase);
    x += radius * Math.cos(angle);
    y += radius * Math.sin(angle);
  }
  return { x, y };
}

/**
 * Generates a complete epicycle chain as an array of segments.
 * Each segment contains the start and end world coordinates.
 * Useful for rendering the arms individually.
 *
 * @param {Array} circles
 * @param {number} time
 * @returns {Array<{start: {x,y}, end: {x,y}, radius, freq, phase}>}
 */
export function computeEpicycleChain(circles, time) {
  let cx = 0, cy = 0;
  const segments = [];
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