// src/math/quaternion/normalize.js
/**
 * Normalize a quaternion to unit length.
 * Original: function qNorm(q)
 * @param {number[]} q - [x, y, z, w]
 * @returns {number[]} Normalised quaternion, or [0,0,0,1] if length is near zero.
 */
export function qNorm(q) {
  const len = Math.sqrt(q[0] ** 2 + q[1] ** 2 + q[2] ** 2 + q[3] ** 2);
  if (len < 1e-10) return [0, 0, 0, 1];
  return [q[0] / len, q[1] / len, q[2] / len, q[3] / len];
}