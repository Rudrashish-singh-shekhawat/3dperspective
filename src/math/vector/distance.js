// src/math/vector/distance.js
/**
 * Euclidean distance between two 3D vectors.
 * @param {number[]} a - [x, y, z]
 * @param {number[]} b - [x, y, z]
 * @returns {number}
 */
export function distance(a, b) {
  const dx = a[0] - b[0];
  const dy = a[1] - b[1];
  const dz = a[2] - b[2];
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}