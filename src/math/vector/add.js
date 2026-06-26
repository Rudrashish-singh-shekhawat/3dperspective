// src/math/vector/add.js
/**
 * Add two vectors component-wise.
 * @param {number[]} a
 * @param {number[]} b
 * @returns {number[]}
 */
export function add(a, b) {
  return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
}