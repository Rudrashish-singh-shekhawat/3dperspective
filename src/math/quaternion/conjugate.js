// src/math/quaternion/conjugate.js
/**
 * Compute the conjugate of a quaternion.
 * Original: function qConj(q)
 * @param {number[]} q - [x, y, z, w]
 * @returns {number[]} Conjugated quaternion [-x, -y, -z, w]
 */
export function qConj(q) {
  return [-q[0], -q[1], -q[2], q[3]];
}