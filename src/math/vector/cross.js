// src/math/vector/cross.js
/**
 * Compute the cross product of two 3D vectors.
 * @param {number[]} a - [ax, ay, az]
 * @param {number[]} b - [bx, by, bz]
 * @returns {number[]} [a×b]
 */
export function cross(a, b) {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ];
}