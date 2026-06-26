// src/math/vector/normalize.js
/**
 * Normalize a vector to unit length.
 * Returns a zero vector if input length is near zero.
 * @param {number[]} v - [x, y, z]
 * @returns {number[]} Normalised vector
 */
export function normalize(v) {
  const len = Math.hypot(...v);
  if (len < 1e-8) return [0, 0, 0];
  return [v[0] / len, v[1] / len, v[2] / len];
}