// src/math/vector/subtract.js
/**
 * Subtract vector b from vector a component-wise.
 * @param {number[]} a
 * @param {number[]} b
 * @returns {number[]}
 */
export function subtract(a, b) {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}