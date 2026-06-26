// src/math/quaternion/fromAxisAngle.js
/**
 * Create a quaternion from an axis and angle.
 * Original: function qAxisAngle(axis, angle)
 * @param {number[]} axis - Normalised rotation axis [x, y, z]
 * @param {number} angle - Rotation angle in radians
 * @returns {number[]} Quaternion [x, y, z, w]
 */
export function qAxisAngle(axis, angle) {
  const h = angle * 0.5;
  const s = Math.sin(h);
  const c = Math.cos(h);
  return [axis[0] * s, axis[1] * s, axis[2] * s, c];
}