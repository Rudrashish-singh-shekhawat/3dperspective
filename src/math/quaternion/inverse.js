// src/math/quaternion/inverse.js
/**
 * Compute the inverse of a quaternion.
 * For a unit quaternion this is the conjugate, but the formula works generally.
 * Original: function qInv(q)
 * @param {number[]} q - [x, y, z, w]
 * @returns {number[]} Inverse quaternion
 */
export function qInv(q) {
  const [x, y, z, w] = q;
  const lenSq = x * x + y * y + z * z + w * w;
  if (lenSq < 1e-12) return [0, 0, 0, 0];
  return [-x / lenSq, -y / lenSq, -z / lenSq, w / lenSq];
}