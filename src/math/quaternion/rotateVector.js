// src/math/quaternion/rotateVector.js
/**
 * Rotate a 3D vector by a quaternion.
 * Original: function rotateV(v, q)
 * @param {number[]} v - [x, y, z] vector to rotate
 * @param {number[]} q - [x, y, z, w] rotation quaternion
 * @returns {number[]} Rotated vector
 */
export function rotateV(v, q) {
   if (!q || typeof q[Symbol.iterator] !== 'function') {
    return [...v];   // return vector unchanged
  }
  const [x, y, z, w] = q;
  const xx = x * x, yy = y * y, zz = z * z;
  const xy = x * y, xz = x * z, yz = y * z;
  const wx = w * x, wy = w * y, wz = w * z;

  // Rotation matrix from quaternion
  const M = [
    [1 - 2 * (yy + zz),     2 * (xy - wz),       2 * (xz + wy)],
    [2 * (xy + wz),         1 - 2 * (xx + zz),   2 * (yz - wx)],
    [2 * (xz - wy),         2 * (yz + wx),       1 - 2 * (xx + yy)],
  ];

  return [
    M[0][0] * v[0] + M[0][1] * v[1] + M[0][2] * v[2],
    M[1][0] * v[0] + M[1][1] * v[1] + M[1][2] * v[2],
    M[2][0] * v[0] + M[2][1] * v[1] + M[2][2] * v[2],
  ];
}